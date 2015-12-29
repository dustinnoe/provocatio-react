import React from 'react';
import Menu from './Menu'
import Auth from "../utils/Auth";
import base from "../utils/Rebase";

class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
            team: null,
            loading: true
        };

    }
    componentDidMount(){
        this.ref = base.syncState('users/' + base.getAuth().uid, {
            context: this,
            state: 'user',
            asArray: true,
            then(){
                if(!!this.state.user){
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
                <div id="content">
                    <h3>Profile Information</h3>
                    <h3>Join a Team</h3>
                    <h3>Create a Team</h3>
                    <h3>Team Information</h3>
                </div>
            </div>
        );
    }
}
export default Settings;