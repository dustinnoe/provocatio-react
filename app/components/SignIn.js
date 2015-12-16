import React from 'react';
var Rebase = require('re-base');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');

class SignIn extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var pushState = this.props.history.pushState;
        base.authWithPassword({
            email    : this.refs.signInEmail.value,
            password : this.refs.signInPassword.value
        }, function(){
            if (base.getAuth()){
                pushState(null, '/challenges'); // Where to go once signed in
            }
        });
    }
    render(){
        return (
            <div>
                <h3>Sign In</h3>
                <form onClick={this.handleSubmit.bind(this)}>
                    <label>Email:</label><input type="text" ref="signInEmail" /><br />
                    <label>Password:</label><input type="password" ref="signInPassword" /><br />
                    <button type="submit">SignIn</button>
                </form>
            </div>
        )
    }
};

export default SignIn;