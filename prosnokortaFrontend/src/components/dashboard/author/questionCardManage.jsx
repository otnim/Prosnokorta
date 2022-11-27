import React from 'react';

function QuestionCardManage({ setQuestionSetCpmbination, onDelete}) {
    const {question, id} = setQuestionSetCpmbination

    return (
        <div className="col-md-4 d-flex justify-content-around">
            <div className="m-3 p-3 rounded crp bg-secondary hc">
                <h4>{question.id}</h4>
                <p>{question.description}</p>
                <div className='form-check'>
                    <p>
                        <input className='form-check-input' type="radio" value="first" name="answer" />A &#41; {question.first_option}
                    </p>
                    <p>
                        <input className='form-check-input' type="radio" value="second" name="answer" /> B &#41; {question.second_option}
                    </p>

                    <p>
                        <input className='form-check-input' type="radio" value="third" name="answer" /> C &#41; {question.third_option}
                    </p>
                    <p>
                        <input className='form-check-input' type="radio" value="fourth" name="answer" /> D &#41; {question.fourth_option}

                    </p>
                </div>
                <button className='btn btn-danger' onClick={() => onDelete(id)}>Delete from set</button>

            </div>
        </div>
    );
}

export default QuestionCardManage;