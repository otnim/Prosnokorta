import React, { useEffect, useState } from 'react';
import { deleteQuestionFromSet } from '../../../services/addQuestionsToSet';
import { getQuestionsFromSet } from '../../../services/questionInSetServices';
import AddQuestionsToSet from './addQuestionsToSet';
import QuestionCardManage from './questionCardManage';


function ManageQuestionInSet(props) {

    const setId = props.match.params.setId

    const [questionSetCpmbinations, setQuestionSetCpmbinations] = useState([])
    const [totalQuestions, setTotalQuestions] = useState(questionSetCpmbinations.length);

    // console.log(setId);

    useEffect(() => {
        async function getData() {
            const result = await getQuestionsFromSet(setId)
            setQuestionSetCpmbinations(result.data)
        }
        getData();
    }, [totalQuestions, setId]);

    const handleDeleteQuestionFromSet = async (id) => {
        console.log('Question Deleted', id);

        try {
            await deleteQuestionFromSet(id)
            alert('Question Deleted');
            setTotalQuestions(totalQuestions - 1)

        } catch (error) {
            console.log(error)
            // alert('Duplicate question and set Combination')

        }
    }

    // console.log(questions)

    return (
        <div className="row col-10">
            <h1>Delete Question From set</h1>
            {questionSetCpmbinations.map((setQuestionSetCpmbination) => (
                <QuestionCardManage setQuestionSetCpmbination={setQuestionSetCpmbination} key={setQuestionSetCpmbination.id} onDelete={handleDeleteQuestionFromSet} />
            ))}

            <hr />

            <h2>Author AddQuestions To Question Set No{setId}</h2>
            <AddQuestionsToSet setId={setId} />

        </div>
    );
};

export default ManageQuestionInSet;