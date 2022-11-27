import React, { useEffect, useState } from 'react';
import _ from "lodash";
import { getCurrentUser } from '../../../services/authService';
import { getExamsByAuthor, updateExamsById } from '../../../services/examService';
import ApproveTable from './approveTable';

function ApproveStudent(props) {

    const [exams, setExam] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

    const authorId = getCurrentUser().id;

    useEffect(() => {
        async function getData() {
            const result = await getExamsByAuthor(authorId)
            // console.log(result)
            setExam(result.data)

        }
        getData();
    }, [authorId]);

    const handlePermission = async (exam) => {
        if (exam.status === "given") return

        const newExam = { ...exam }

        if (exam.status === "requested") {
            newExam.status = "permitted"
        }

        if (exam.status === "permitted") {
            newExam.status = "requested"
        }

        try {
            const response = await updateExamsById(exam.id, newExam);
            alert('Request Updated Refresh To Get the Change In UI')
        } catch (ex) {
            alert('Update not Possible')
        }

        // console.log('Handle Permission', exam)
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
        return <p>No One Join Your Any question Set. Or You have not create a Question set Yet</p>;


    return (
        <div>
            <h2>This page help use to approve student to give exam in a Specific question sets</h2>
            <ApproveTable
                exams={sortedExams}
                onPermission={handlePermission}
                onSort={handleSort}
                sortColumn={sortColumn}
            />
        </div>
    );
}

export default ApproveStudent;