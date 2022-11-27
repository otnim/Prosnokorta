import React from 'react';
import Table from '../../common/table';

function JoinSetTable({ sets, onJoin, onSort, sortColumn }) {

    const columns = [
        { path: "id", label: "Question Set Id" },
        { path: "title", label: "Title" },
        { path: "duration", label: "Duration" },
        { path: "total_questions", label: "Questions" },
        { path: "start_at", label: "Will Start At" },


        {
            key: "action",
            label: "Join",
            content: (set) => (
                <button
                    onClick={() => onJoin(set)}
                    className="btn btn-primary btn-sm"
                >
                    Join Request
                </button>
            ),
        },
    ]
    return (
        <Table
            columns={columns}
            data={sets}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
}

export default JoinSetTable;