import React from 'react'
import { Link } from 'react-router'
import base from "../utils/Rebase"
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasDisplayName: null,
            isOnTeam: null
        }
    }
    checkUserProfile(){
        if (base.getAuth()) {
            base.fetch('users/' + base.getAuth().uid, {
                context: this,
                then(data){
                    if(data !== null) {
                        !!data.displayName ? this.setState({hasDisplayName: true}) : this.setState({hasDisplayName: false});
                        !!data.team ? this.setState({isOnTeam: true}) : this.setState({isOnTeam: false});
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
                {!base.getAuth() ? <SignedOutMenu />: ""}
                {!!base.getAuth() ? <SignedInMenu challenges={this.props.challenges} isOnTeam={this.state.isOnTeam} />  : ""}
            </nav>
        )
    }
};

export default Menu