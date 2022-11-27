import React, { useEffect, useState } from 'react';
import QuestionCardAdd from './questionCardAdd';
import { getQuestions } from '../../../services/questionService';
import { addQuestionToSet } from '../../../services/addQuestionsToSet';


function AddQuestionsToSet({ setId}) {



    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function getData() {
            const result = await getQuestions()
            setQuestions(result.data)
        }
        getData();
    }, []);

    const handleAddQuestionToSet = async (question) => {
        console.log('Question Added no ', question.id);
        const details = {
            set: setId, 
            question: question.id
        }
        try {
            await addQuestionToSet(details)
            alert('Question Added');
        } catch (error) {
            console.log(error)
            alert('Duplicate question and set Combination')
            
        }
    }

    // console.log(questions)

    return (
        <div className="row col-10">
            {questions.map((question) => (
                <QuestionCardAdd question={question} key={question.id} onAdd={handleAddQuestionToSet} />
            ))}
        </div>
    );
};

export default AddQuestionsToSet;