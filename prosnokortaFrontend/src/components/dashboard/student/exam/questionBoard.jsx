import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import _ from "lodash";

function QuestionBoard({ question, onAnswer, seen }) {
    let details = question.question


    let isAnswered = seen.isAnswered
    // let isAnswered = _.get(seen, 'inAnswered')

    // const [isAnswered, setIsAnswered] =  useState(seen.isAnswered)
    // useEffect(() => {
    //     setIsAnswered()
    // }, [setId]);

    // useEffect(() => {
    //     // document.title = `You clicked ${count} times`;
    // });

    const renderClassName = (answer) => {
        if (isAnswered) {
            if (seen.ans === answer) {
                if (answer === details.answer) {
                    return 'btn btn-success'
                }
                else return 'btn btn-danger'
            }
            else {

                return 'btn btn-info'
            }
        }
        else {
            return 'btn btn-info'
        }

    }

    return (
        <div>
            <p>Description: {details.description}</p>
            <div className="form-group d-grid gap-3 col-6">
                <button className={renderClassName(1)} disabled={isAnswered} onClick={() => onAnswer(1, details, seen)}>{details.first_option}</button>

                <button className={renderClassName(2)} disabled={isAnswered} onClick={() => onAnswer(2, details, seen)}>{details.second_option}</button>

                <button className={renderClassName(3)} disabled={isAnswered} onClick={() => onAnswer(3, details, seen)}>{details.third_option}</button>

                <button className={renderClassName(4)} disabled={isAnswered} onClick={() => onAnswer(4, details, seen)}>{details.fourth_option}</button>

            </div>
        </div>
    );
}

export default QuestionBoard;