import React from 'react';
import Menu from './Menu';
var Auth = require('../utils/Auth.js');
var base = require('../utils/Rebase');

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
                <Menu />
                <h3>Leaderboard</h3>
                <p>Coming soon!</p>
            </div>
        )
    }
};

export default LeaderBoard;