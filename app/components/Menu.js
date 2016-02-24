import React from 'react';
import { Link } from 'react-router';
import base from "../utils/Rebase";
import ChallengeBoardItem from './ChallengeBoardItem';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            challenges: this.props.challenges,
            hasDisplayName: null,
            isOnTeam: null
        }
    }
    checkUserProfile(){
        if (base.getAuth()) {
            base.fetch('users/' + base.getAuth().uid, {
                context: this,
                then(data){
                    !!data.displayName ? this.setState({hasDisplayName: true}) : this.setState({hasDisplayName: false});
                    !!data.team ? this.setState({isOnTeam: true}) : this.setState({isOnTeam: false});
                }
            });
        }
    }
    componentDidMount(){
        this.checkUserProfile();
    }
    render(){
        return (
            <nav>
                <ul>
                    {!base.getAuth() ? <li><Link to={'/register'}>Register</Link></li> : ""}
                    <li><Link to={'/leaderboard'}>Leaderboard</Link></li>
                    {!!base.getAuth() && this.state.isOnTeam && Array.isArray(this.props.challenges)
                        ? <li>Challenges
                            <ChallengeBoardItem challenges={this.props.challenges} />
                        </li>
                        : <span>Join or create a team to see the challenges.</span>}

                </ul>
            </nav>
        )
    }
};

export default Menu;