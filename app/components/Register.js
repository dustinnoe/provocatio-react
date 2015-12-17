import React from 'react';
import Menu from './Menu'
import FlashMessage from './FlashMessage';
var Rebase = require('re-base');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state.flashMessage = {
            text: null
        }
    }
    handleSubmit(e){
        e.preventDefault();
        base.createUser({
            email: this.refs.registerEmail.value,
            password: this.refs.registerPassword.value
        }, function(error, userData) {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        this.setState({
                            flashMessage: {
                                text: "That email address already has an account."
                            }
                        });
                        break;
                    case "INVALID_EMAIL":
                        this.setState({
                            flashMessage: {
                                text: "That email address is not properly formatted."
                            }
                        });
                        break;
                    default:
                        this.setState({
                            flashMessage: {
                                text: "There was a problem creating an account."
                            }
                        });
                        console.log("Error creating user:", error);
                }
            } else {
                this.setState({
                    flashMessage: {
                        text: null
                    }
                });
                console.log("Successfully created user account with uid:", userData.uid);
            }
        }.bind(this));
    }
    render(){
        return (
            <div>
                <Menu />
                <h3>Register</h3>
                {!!this.state.flashMessage.text === true ? <FlashMessage flashMessage={this.state.flashMessage} /> : ""}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>Email:</label><input type="text" ref="registerEmail" /><br />
                    <label>Password:</label><input type="password" ref="registerPassword" /><br />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
};

export default Register;