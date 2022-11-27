import React from 'react';
import Table from '../../common/table';

function ApproveTable({ exams, onPermission, onSort, sortColumn }) {

    const columns = [
        { path: "id", label: "Exam Id" },
        { path: "set", label: "Set Id" },
        { path: "status", label: "Status" },
        { path: "score", label: "Students Score" },
        { path: "corrected", label: "Total Corrected" },

        {
            key: "action",
            label: "Action",
            content: (exam) => (
                <button
                    disabled={exam.status === "given"}
                    onClick={() => onPermission(exam)}
                    className={exam.status === "requested" ? 'btn btn-success btn-sm' : 'btn btn-danger btn-sm'}
                >
                    {exam.status === "requested" ? 'Give Permission' : 'Cancel Permission'}
                </button>
            ),
        },
    ]

    return (
        <Table
            columns={columns}
            data={exams}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
}

export default ApproveTable;