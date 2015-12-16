import React from 'react';
var Rebase = require('re-base');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');
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