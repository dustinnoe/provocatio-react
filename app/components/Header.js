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
            <div id="header">
                <Link to={'/home'}><img src="CTFLogo.png" alt="Provocatio" /></Link>
                <div id="headerRight">
                    {!!base.getAuth() ? <a href="index.html#/signout"><img src="Logout_2.png" alt="Sign Out" /></a> : ""}
                    {!!base.getAuth() ? <Link to={'/settings'}><img src="Configuration.png" alt="Settings" /></Link> : ""}

                </div>
            </div>
        )
    }
};

export default Menu;