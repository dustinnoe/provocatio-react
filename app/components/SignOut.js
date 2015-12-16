import React from 'react';
var Rebase = require('re-base');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');

class SignOut extends React.Component{

    componentDidMount(){
        base.unauth();
        this.props.history.pushState(null, '/signin');
    }
    render(){
        return (
            <div>
                Goodbye
            </div>
        )
    }
};

export default SignOut;