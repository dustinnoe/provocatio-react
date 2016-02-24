import React from 'react';
import {Link} from 'react-router';
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
                    if (data === null || !data.displayName || !data.team) {
                        this.setState({menuFlag: false});
                    } else {
                        this.setState({menuFlag: true});
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
            <div id="header">
                <Link to={'/'}><img src="/CTFLogo.png" alt="Provocatio" /></Link>
                <div id="headerRight">
                    {!!base.getAuth() ? <a href="/signout"><img src="/Logout_2.png" alt="Sign Out" /></a> : ""}
                    {!!base.getAuth() ? <Link to={'/settings'}><img src="/Configuration.png" alt="Settings" /></Link> : ""}

                </div>
            </div>
        )
    }
};

export default Menu;