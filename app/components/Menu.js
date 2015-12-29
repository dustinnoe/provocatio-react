import React from 'react';
import { Link} from 'react-router';
import base from "../utils/Rebase";

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuFlag: false
        }
    }
    checkUserProfile(){
        if (base.getAuth()) {
            base.fetch('users/' + base.getAuth().uid, {
                context: this,
                then(data){
                    if (!!data.displayName && !!data.team) {
                        this.setState({menuFlag: true});
                    } else {
                        this.setState({menuFlag: false});
                    }
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
                    {this.state.menuFlag ? <li><Link to={'/leaderboard'}>Leaderboard</Link></li> : ""}
                    {this.state.menuFlag ? <li><Link to={'/challenges'}>Challenges</Link></li> : ""}
                </ul>
            </nav>
        )
    }
};

export default Menu;