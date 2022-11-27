import React from "react";
import Joi from "joi";
import Form from "../common/form";
import { getNewToken, registerUser } from "../../services/authService";

class RegistrationForm extends Form {
    state = {
        data: {
            username: "",
            email: "",
            password: "",
            first_name: "",
            user_type: "",
        },
        users: [
            {
                id: "author",
                title: "Author"
            },
            {
                id: "student",
                title: "Student"
            }
        ],
        errors: {},
    };

    schema = Joi.object({
        username: Joi.string().min(5).max(255).required().label("Name"),
        password: Joi.string().min(8).max(255).required().label("Password"),
        // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).label("Password"),
        email: Joi.string().min(6).max(255).required().label("Email"),
        first_name: Joi.string().min(4).max(255).required().label("Full Name"),
        user_type: Joi.string().min(3).max(255).required().label("User Type"),



    });

    doSubmit = async () => {
        // console.log(this.state.data);

        try {
            const response = await registerUser(this.state.data);
            if (response.status === 201) {
                const data = this.state.data
                const res = await getNewToken(data.username, data.password);
                // console.log(res)

                window.location = "/";
            }
            // auth.loginWithJwt(response.headers["x-auth-token"]);
            // // this.props.history.push("/");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                alert('User already Exists with This Email and Username')
                const errors = { ...this.state.errors };
                errors.email = 'User and Email Combination Wrong';
                errors.username = 'User and Email Combination Wrong';
                this.setState({ errors });
                console.log(ex)
            }
        }
    };
    render() {
        return (
            <div className="log mt-5 d-flex align-items-center justify-content-center">
                <div className="col-sm-3 col-md-4 cb-cool p-4 pt-5 rounded mt-5">
                    <h2>User Registration form</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("username", "Username")}
                        {this.renderInput("email", "Email Address", "email")}
                        {this.renderInput("password", "Password", "password")}
                        {this.renderInput("first_name", "Full Name")}


                        {this.renderSelect("user_type", "User Type", this.state.users)}

                        {this.renderButton("Register")}
                    </form>
                </div>
            </div>
        );
    }
}

export default RegistrationForm;
