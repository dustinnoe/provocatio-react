import React from 'react'
import { Link } from 'react-router'
import ChallengeBoardItem from './ChallengeBoardItem'

class SignedInMenu extends React.Component{
    render(){
        return (<ul>
            <li><Link to={'/leaderboard'}>Leaderboard</Link></li>
            {this.props.isOnTeam && Array.isArray(this.props.challenges)
                ?
                <li>Challenges
                    <ChallengeBoardItem challenges={this.props.challenges} />
                </li>
                :
                <span>Join or create a team to see the challenges.</span>}
        </ul>)
    }
}

export default SignedInMenu