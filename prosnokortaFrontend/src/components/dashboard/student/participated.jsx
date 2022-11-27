import React, { useEffect, useState } from 'react';
import _ from "lodash";
import { getCurrentUser } from '../../../services/authService';
import { getExamsByStudent, updateExamsById } from '../../../services/examService';
import ParticipatedTable from './participatedTable';
import { useHistory } from 'react-router-dom';

function Participated(props) {
    const [exams, setExam] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

    const history = useHistory();
    // console.log(props)

    const studentId = getCurrentUser().id;

    useEffect(() => {
        async function getData() {
            const result = await getExamsByStudent(studentId)
            setExam(result.data)

        }
        getData();
    }, [studentId]);

    const handleGiveExam = async (exam) => {
        const newExam = { ...exam }

        if (exam.status === 'permitted') {
            newExam.status = "given";
            // newExam.corrected = 0;
            newExam.score = 0
        }

        // props.history.push({
        //     pathname: '/details',
        //     state
        // });

        // const location = {
        //     pathname: '/student/giveexam',
        //     state: {
        //         setId: exam.set,
        //         examId: exam.set
        //     }
        // }

        // history.push(location)
        // history.replace(location)


        try {
            await updateExamsById(exam.id, newExam);
            // history.push("/student/giveexam/" + exam.id);

            history.replace({
                pathname: '/student/giveexam',
                state: {
                    setId: exam.set,
                    examId: exam.id
                }
            })




        } catch (ex) {
            alert('Not Possible')
        }



    }

    const sortedExams = _.orderBy(
        exams,
        [sortColumn.path],
        [sortColumn.order]
    );

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    };

    if (sortedExams.length === 0)
        return <p>There is no Registerd Exam for this student. Please Join a question Set</p>;


    return (
        <div>
            <h1>Participed exam</h1>
            <ParticipatedTable
                exams={sortedExams}
                onGive={handleGiveExam}
                onSort={handleSort}
                sortColumn={sortColumn}
            />

        </div>
    );
}

export default Participated;