import React from 'react';
import base from "./Rebase";
import { Router, browserHistory } from 'react-router';

class Auth extends React.Component {
    constructor(props){
        super(props);
    }
    isAuthenticated(){
        if (!base.getAuth()){
            browserHistory.replace('/signin')
            return false
        }
        return true
    }
}


export default Auth;