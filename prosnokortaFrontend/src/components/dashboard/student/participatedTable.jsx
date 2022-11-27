import React from 'react';
import Table from '../../common/table';

function ParticipatedTable({ exams, onGive, onSort, sortColumn }) {

    const columns = [
        { path: "id", label: "Exam Id" },
        { path: "set", label: "Set Id" },
        { path: "status", label: "Status" },
        { path: "score", label: "Obtained Score" },
        { path: "corrected", label: "Corrected Answer" },

        {
            key: "action",
            label: "Action",
            content: (exam) => (
                <button
                    disabled={exam.status === "requested"}
                    onClick={() => onGive(exam)}
                    className="btn btn-primary btn-sm"
                >
                    {exam.status === "given" ? 'Practice Again' : 'Give Exam'}
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

export default ParticipatedTable;