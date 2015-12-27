import React from 'react';
import Menu from './Menu'
import ChallengeBoardItem from './ChallengeBoardItem';

var Auth = require('../utils/Auth.js');
//var base = require('../utils/Rebase');
import base from "../utils/Rebase";

class ChallengeBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            challenges: [],
            user: null,
            loading: true
        };

    }
    componentDidMount(){
        this.ref = base.syncState('challenges', {
            context: this,
            state: 'challenges',
            asArray: true,
            then(){
                if(!!this.state.user){
                    this.setState({loading: false});
                }
            }
        });
        base.fetch('users/' + base.getAuth().uid, {
            context: this,
            then(data){
                this.setState({user: data});
                if(this.state.challenges.length > 0){
                    this.setState({loading: false});
                }
            }
        });
    }
    componentWillMount(){
        new Auth(this.props).isAuthenticated();
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    render() {
        return (
            <div>
                <Menu />
                <h3>Challenge Board</h3>
                {this.state.loading === true ? <h3> LOADING... </h3> : <ChallengeBoardItem items={this.state.challenges} user={this.state.user} />}
                <div id="challengeDesc"></div>
            </div>
        );
    }
}

export default ChallengeBoard;