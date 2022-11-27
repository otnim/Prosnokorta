import React from 'react';
import { Link } from 'react-router-dom';
import Table from './../common/table';

function SetTable({ sets, onDelete, onSort, sortColumn }) {
    const columns = [
        { path: "id", label: "Question Set Id" },
        { path: "title", label: "Title" },
        { path: "total_marks", label: "Marks" },
        { path: "created", label: "Created Date" },
        { path: "duration", label: "Duration" },
        { path: "total_questions", label: "Questions" },
        { path: "start_at", label: "Will Start At" },

        {
            key: "edit",
            label: "Manage",
            content: (set) => (
                <Link
                    className="btn btn-success btn-sm"
                    to={`/author/managequestioninset/${set.id}`}
                >
                    Add and Delete Question
                </Link>
            )
        },

        {
            key: "action",
            label: "Delete",
            content: (set) => (
              <button
                onClick={() => onDelete(set)}
                className="btn btn-danger btn-sm"
              >
                Delete Set
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

export default SetTable;