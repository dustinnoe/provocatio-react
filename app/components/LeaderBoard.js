import React from 'react';
import Menu from './Menu';
import LeaderBoardItem from './LeaderBoardItem';

var Auth = require('../utils/Auth.js');
import base from "../utils/Rebase";

class LeaderBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            leaderboard: [],
            loading: true
        };

    }
    componentDidMount(){
        this.ref = base.syncState('leaderboard', {
            context: this,
            state: 'leaderboard',
            asArray: true,
            then(){
                this.setState({loading: false});
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
                <table>
                    <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <LeaderBoardItem items={this.state.leaderboard} />
                </table>
            </div>
        );
    }
};

export default LeaderBoard;