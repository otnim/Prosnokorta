import React, { useEffect, useState } from 'react';
import { deleteSet, getQuestionSetByAuthor } from '../../../services/questionSetService';
import _ from "lodash";
import SetTable from '../../sets/setTable';
import { getCurrentUser } from './../../../services/authService';

function ManageSets(props) {
    const [questionSets, setQuestionSets] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

    const authoId = getCurrentUser().id;
    

    useEffect(() => {
        async function getData() {
            const result = await getQuestionSetByAuthor(authoId)
            setQuestionSets(result.data)

        }
        getData();
    }, []);

    const handleDelete = async (set) => {
        const originalSetArrays = questionSets;
        const newSetArrays = questionSets.filter((s) => s.id !== set.id);

        setQuestionSets(newSetArrays);
        try {
            await deleteSet(set.id);

        } catch (ex) {
            alert('Set Contains Question. Please empty First');
            setQuestionSets(originalSetArrays)

        }
    };

    const sortedquestionSets = _.orderBy(
        questionSets,
        [sortColumn.path],
        [sortColumn.order]
    );

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    };


    if (sortedquestionSets.length === 0)
        return <p>There is no Sets for this author in database</p>;

    return (
        <div>
            <h1>This is all Question Sets by author</h1>
            <SetTable
                sets={sortedquestionSets}
                onDelete={handleDelete}
                onSort={handleSort}
                sortColumn={sortColumn}
            />



        </div>
    );
}

export default ManageSets;