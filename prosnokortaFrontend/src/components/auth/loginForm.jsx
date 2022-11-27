import Form from './../common/form';
import React from "react";
import Joi from "joi";
import { getNewToken } from '../../services/authService';

class LoginForm extends Form {

    state = {
        data: {
            username: "",
            password: "",
        },
        errors: {},
    };

    schema = Joi.object({
        username: Joi.string().min(3).max(150).required().label("Username"),
        password: Joi.string().min(5).max(150).required().label("Password"),
    });

    doSubmit = async () => {
        try {

            const { data } = this.state;
            console.log(data)
            await getNewToken(data.username, data.password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {

            const errors = { ...this.state.errors };
            errors.email = ex.response.data;
            this.setState({ errors });
        }
    }

    render() {

        return (
            <div className="log d-flex align-items-center justify-content-center">
                <div className="col-sm-3 col-md-4 cb-cool p-4 rounded">
                    <h2>User Login form</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("username", "Username", "text")}
                        {this.renderInput("password", "Password", "password")}
                        {this.renderButton("Login")}
                    </form>
                </div>
            </div>
        );
    }

};





export default LoginForm;