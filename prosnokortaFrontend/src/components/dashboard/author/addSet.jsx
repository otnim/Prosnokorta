import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../../../services/authService';
import { postQuestionSet } from '../../../services/questionSetService';
function AddSet() {
    const user = getCurrentUser();

    let history = useHistory();

    // function handleClick() {
    // }
    // history.push("/home");

    const [questionSet, setQuestionsSet] = useState({
        "title": "",
        "total_questions": "",
        "total_marks": "",
        "duration": "",
        "start_at": "",
        "author": user.id
    });

    const handlePostSet = async () => {
        try {
            const response = await postQuestionSet(questionSet)
            alert('Code : ' + response.status + ', Message: ' + response.statusText)
            const newSetId = response.data.id;

            history.push(`/author/managequestioninset/${newSetId}`)

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionSet.start_at === "") {
            alert("Please Select Valid date")
        }
        else {
            handlePostSet()
            console.log(questionSet);
        }
    };

    const handleChange = (e) => {
        const newQuestionSet = { ...questionSet };
        newQuestionSet[e.currentTarget.name] = e.currentTarget.value;
        setQuestionsSet(newQuestionSet);
    };

    return (
        <div>
            <h1>This is authors</h1>

            <h2>Author will create a question set</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>

                        <div className="form-group mb-3">
                            <label className="form-label">Question Set Title</label>
                            <input
                                autoFocus
                                type="text"
                                value={questionSet.title}
                                onChange={handleChange}
                                name="title"
                                min="1" max="500"
                                className="form-control"
                            />
                        </div>


                        <div className="form-group mb-3">
                            <label className="form-label">Total Questions</label>
                            <input
                                type="number"
                                value={questionSet.total_questions}
                                onChange={handleChange}
                                name="total_questions"
                                min="1" max="500"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Total Marks</label>
                            <input
                                type="number"
                                value={questionSet.total_marks}
                                onChange={handleChange}
                                name="total_marks"
                                min="1" max="500"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Exam Start time</label>
                            <input
                                type="datetime-local"
                                value={questionSet.start_at}
                                onChange={handleChange}
                                name="start_at"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Duration</label>
                            <input
                                type="number"
                                value={questionSet.duration}
                                onChange={handleChange}
                                name="duration"
                                min="1" max="500000"
                                className="form-control"
                            />
                        </div>

                        <button className='btn btn-success'>Submit</button>
                    </div>
                </form>

            </div>


        </div>
    );
}

export default AddSet;