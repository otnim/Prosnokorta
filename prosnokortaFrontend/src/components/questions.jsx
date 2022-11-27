import React, { useEffect, useState } from 'react';
import { getQuestions } from '../services/questionService';
import QuestionCard from './questions/questionCard';
import Spinner from 'react-bootstrap/Spinner';

function Questions(props) {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function getData() {
            const result = await getQuestions()
            setQuestions(result.data)
        }
        getData();
    }, []);

    // console.log(questions)

    return (
        <div className="row col-10 d-flex justify-content-center">
            {questions.length === 0 ?
                <div className='row col-10 d-flex justify-content-center'>
                    <br />
                    <Spinner animation="border" variant="primary" />
                    <Spinner animation="border" variant="secondary" />
                    <Spinner animation="border" variant="success" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <h3 className='text-center'>Please Wait To load the data from Backend</h3>
                    <p className='text-center'>Some time server may works after 5-7 seconds. To load the data Please Refresh</p>
                </div>
                : questions.map((question) => (

                    <QuestionCard question={question} key={question.id} />
                ))}

        </div>
    );
};

export default Questions;