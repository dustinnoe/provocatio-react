import React from 'react';
import Menu from './Menu';
var base = require('../utils/Rebase');

class SignIn extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var pushState = this.props.history.pushState;
        base.authWithPassword({
            email    : this.refs.signInEmail.value,
            password : this.refs.signInPassword.value
        }, function(){
            var authData = base.getAuth();
            if (authData){
                base.fetch('users/' + base.getAuth().uid, {
                    context: this,
                    then(data){
                        if (!!data.displayName && !!data.team){
                            pushState(null, '/challenges');
                        } else {
                            pushState(null, '/home');
                        }
                    }
                });

            }
        }.bind(this));
    }
    render(){
        return (
            <div>
            <Menu />
                <h3>Sign In</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>Email:</label><input type="text" ref="signInEmail" /><br />
                    <label>Password:</label><input type="password" ref="signInPassword" /><br />
                    <button type="submit">SignIn</button>
                </form>
            </div>
        )
    }
};

export default SignIn;