import React from 'react';
import { getCurrentUser } from '../../../services/authService';
import { Redirect, Route, Switch } from "react-router";
import AddSet from './addSet';
import AuthorLeftNav from './authorLeftNav'
import AddNewQuestion from './addNewQuestion';
import ApproveStudent from './approveStudent';
import ManageQuestionInSet from './manageQuestionInSet';
import ManageSets from './manageSets';

function AuthorDashboard(props) {
    const user = getCurrentUser();
    const isAuthor = user && user.userType === "author";

    if(!isAuthor) return <Redirect to="login" />

    return (
        <div className="row container-fluid">
            <div className="col-md-2">
                <AuthorLeftNav></AuthorLeftNav>
            </div>

            <div className="col-10">
                <Switch>
                    <Route path="/author/addset">
                        <AddSet />
                    </Route>
                    <Route path="/author/newquestion">
                        <AddNewQuestion />
                    </Route>

                    <Route path="/author/approvestudent">
                        <ApproveStudent />
                    </Route>

                    <Route path="/author/managequestioninset/:setId" component={ManageQuestionInSet}/>
                    
                    
                    
                    <Route path="/author">
                        <ManageSets />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AuthorDashboard;