import React from 'react';
var base = require('./Rebase');
import Router from 'react-router';

class Auth extends React.Component {
    constructor(props){
        super(props);
    }
    isAuthenticated(){
        if (!base.getAuth()){
            this.props.history.pushState(null, '/signin');
        }
    }
}


export default Auth;