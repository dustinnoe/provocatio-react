import React from 'react';
import Menu from './Menu';
import Auth from "../utils/Auth";
import base from "../utils/Rebase";
import LeaderBoardItem from './LeaderBoardItem';

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
        new Auth().isAuthenticated()

    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    render(){
        return (
            <div>
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