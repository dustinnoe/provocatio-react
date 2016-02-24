import React from 'react';
import { browserHistory } from 'react-router'
import base from "../utils/Rebase";

class SignOut extends React.Component{

    componentDidMount(){
        base.unauth();
        browserHistory.push('/signin');
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