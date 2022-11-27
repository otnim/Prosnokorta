import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { getExamById, updateExamsById } from "../../../../services/examService";
import { getQuestionsFromSet } from "../../../../services/questionInSetServices";
import QuestionBoard from "./questionBoard";
import { useHistory } from 'react-router-dom';


function GiveExam(props) {
    const { setId, examId } = (props.location && props.location.state) || {};

    const [questions, setQuestions] = useState([]);
    const [presentQuestion, setPresentQuestion] = useState(1);
    const [totalVisited, setTotalVisited] = useState(1)
    const [seenQuestions, setSeenQuestions] = useState([{
        no: 1,
        isAnswered: false,
        ans: 0,
    },
    ])
    const [corrected, setCorrected] = useState(0);
    const [exam, setExam] = useState({})

    const history = useHistory();


    useEffect(() => {
        async function getData() {
            const result = await getQuestionsFromSet(setId)
            setQuestions(result.data)
        }
        getData();

        async function getExam() {
            const res = await getExamById(examId)
            setExam(res.data)
        }
        getExam();
    }, [setId, examId]);

    const handlePresentQuestion = (count) => {
        setPresentQuestion(presentQuestion + count)
        // console.log(presentQuestion)

        if ((presentQuestion >= totalVisited) && (count !== -1)) {
            setTotalVisited(totalVisited + 1)

            let newseen = [...seenQuestions]
            newseen.push({
                no: presentQuestion + 1,
                isAnswered: false,
                ans: 0
            })
            setSeenQuestions(newseen)
        }
    }
    const doAnswer = (selected, details, seen) => {
        const newAnswerObj = { ...seen }
        newAnswerObj.isAnswered = true
        newAnswerObj.ans = selected

        let seens = [...seenQuestions]

        let index = newAnswerObj.no - 1

        seens[index] = newAnswerObj
        setSeenQuestions(seens)

        if (selected === details.answer) {
            setCorrected(corrected + 1)
        }

    }
    const sumbitFullAnswer = async () => {

        if (exam.corrected === null) {
            const newExam = { ...exam }
            newExam.corrected = corrected;
            newExam.score = corrected

            try {
                await updateExamsById(examId, newExam);
                
            } catch (ex) {
                console.log(ex)
            }
        }
        else{
            alert('You have already Given the exam before, socre will not change')
        }

        history.replace("/student/participated");



    }


    if (!setId || !examId) return <Redirect to="/student/joinset" />

    return (
        <div>
            <h1>Total Questions =  {questions.length}</h1>
            <h2>Total Corrected : {corrected}</h2>
            {questions.length > 0 ? <QuestionBoard
                question={questions[presentQuestion - 1]}
                onAnswer={doAnswer}
                seen={seenQuestions[presentQuestion - 1]}
            /> : <h3>Question Set Is loading Please Wait.....</h3>}

            <br />


            <button className="btn btn-warning me-md-4" disabled={presentQuestion === 1} onClick={() => handlePresentQuestion(-1)}>Previous Question</button>

            <button className="btn btn-primary me-md-5" disabled={presentQuestion === questions.length} onClick={() => handlePresentQuestion(1)}>Next Question</button>

            <button className="btn btn-success" disabled={presentQuestion !== questions.length} onClick={() => sumbitFullAnswer(1)}>Submit Full Answer</button>






        </div>
    );
};

export default GiveExam;