import React from 'react';
import FlashMessage from './FlashMessage';
var Rebase = require('re-base');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state.flashMessage = {
            class: "notice",
            text: ""
        }
    }
    handleSubmit(e){
        e.preventDefault();
        var flashMessage = "";
        base.createUser({
            email: this.refs.registerEmail.value,
            password: this.refs.registerPassword.value
        }, function(error, userData) {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        flashMessage = "That email address has an account.";
                        break;
                    case "INVALID_EMAIL":
                        flashMessage= "That email address is not properly formatted.";
                        break;
                    default:
                        flashMessage = "There was a problem creating an account.";
                        console.log("Error creating user:", error);
                }
            } else {
                flashMessage = "";
                console.log("Successfully created user account with uid:", userData.uid);
            }
        })
        this.state.flashMessage.text = flashMessage;
        console.log(this.refs.registerEmail.value);
    }
    render(){
        return (
            <div>
                <h3>Register</h3>
                {this.state.flashMessage.text === true ? <FlashMessage flashMessage={this.state.flashMessage} /> : ""}
                <form onClick={this.handleSubmit.bind(this)}>
                    <label>Email:</label><input type="text" ref="registerEmail" /><br />
                    <label>Password:</label><input type="password" ref="registerPassword" /><br />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
};

export default Register;