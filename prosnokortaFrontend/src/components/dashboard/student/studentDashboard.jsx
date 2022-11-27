import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getCurrentUser } from '../../../services/authService';
import GiveExam from './exam/giveExam';
import JoinSets from './joinSets';
import Participated from './participated';
import StudentLeftNav from './studentLeftNav';


function StudentDashboard(props) {
    const user = getCurrentUser();
    const isStudent = user && user.userType === "student";

    if (!isStudent) return <Redirect to="login" />
    return (
        <div className="row container-fluid">
            <div className="col-md-2">
                <StudentLeftNav></StudentLeftNav>
            </div>

            <div className="col-10">
                <h1>Student StudentDashboard</h1>
                <Switch>
                    <Route path="/student/joinset" component={JoinSets} />

                    <Route path="/student/participated" component={Participated} />

                    {/* <Route component={UserForm} path="/" exact={true} /> */}
                    
                    <Route path="/student/giveexam" component={GiveExam} />

                    <Route path="/student/">
                        <Participated />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default StudentDashboard;