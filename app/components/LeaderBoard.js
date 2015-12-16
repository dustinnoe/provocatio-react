import React from 'react';
var Rebase = require('re-base');
var Auth = require('../utils/Auth.js');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');

class LeaderBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            leaderboard: [],
            loading: true
        }
    }
    componentDidMount(){
        this.ref = base.syncState('leaderboard', {
            context: this,
            state: 'leaderboard',
            asArray: true,
            then(){
                this.setState({loading: false})
            }
        });
    }
    componentWillMount(){
        new Auth(this.props).isAuthenticated();
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    render(){
        return (
            <div>
                <h3>Leaderboard</h3>
                <p>Coming soon!</p>
            </div>
        )
    }
};

export default LeaderBoard;