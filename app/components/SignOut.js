import React from 'react';
var base = require('../utils/Rebase');

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