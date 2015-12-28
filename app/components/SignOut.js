import React from 'react';
import base from "../utils/Rebase";

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