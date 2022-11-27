import React, { useEffect, useState } from 'react';
import { getQuestionsSets } from '../../../services/questionSetService';
import _ from "lodash";
import JoinSetTable from './joinSetTable';
import { getCurrentUser } from '../../../services/authService';
import { postExam } from '../../../services/examService';

function JoinSets(props) {
    const [questionSets, setQuestionSets] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

    const user = getCurrentUser();

    useEffect(() => {
        async function getData() {
            const result = await getQuestionsSets()
            setQuestionSets(result.data)

        }
        getData();
    }, []);

    const handleJoin = async (setInput) => {
        const examDetails = {
            set: setInput.id,
            author: setInput.author,
            student: user.id
        }

        try {
            const res = await postExam(examDetails);
            alert('Join Request send To Author')
        } catch (ex) {
            alert('You have Already send a join Request this')
        }
    }

    const sortedquestionSets = _.orderBy(
        questionSets,
        [sortColumn.path],
        [sortColumn.order]
    );

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    };

    if (sortedquestionSets.length === 0)
        return <p>There is no Sets in database</p>;

    return (
        <div>
            <h3>Student can Join A set For Participating Online Exam</h3>
            <JoinSetTable
                sets={sortedquestionSets}
                onJoin={handleJoin}
                onSort={handleSort}
                sortColumn={sortColumn}
            />

        </div>
    );
}

export default JoinSets;