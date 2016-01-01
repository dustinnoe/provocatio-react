import React from 'react';
import Menu from './Menu'
import Auth from "../utils/Auth";
import base from "../utils/Rebase";

class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                displayName: ""
            },
            team: null,
            teamMembers: [],
            loading: true
        };
    }
    componentWillMount(){
        new Auth(this.props).isAuthenticated();
        this.userRef = base.syncState('users/' + base.getAuth().uid, {
            context: this,
            state: 'user',
            then(){
                if(!!this.state.user.team){
                    this.loadTeamState(this.state.user.team);
                }
            }

        });
    }
    componentWillUnmount(){
        if(!!this.userRef){
            base.removeBinding(this.userRef);
        }
        if(!!this.teamRef){
            base.removeBinding(this.teamRef);
        }
    }
    fetchUserDisplayName(member){
        base.fetch('users/' + member + '/displayName', {
            context: this,
            then(displayName){
                var newArray = this.state.teamMembers.slice();
                newArray.push(displayName);
                this.setState({teamMembers:newArray});
            }
        })
    }
    loadTeamState(teamID){
        this.teamRef = base.syncState('teams/' + teamID, {
            context: this,
            state: 'team',
            then(){
                for (var member in this.state.team.members) {
                    if (this.state.team.members.hasOwnProperty(member)) {
                        this.fetchUserDisplayName(member);
                    }
                }
            }
        })
    }
    saveProfileInformation(){
        alert("Write the code to save profile information");
    }
    handleChange(e){
        var user = {};
        if(e.target.name === "firstName") {user.firstName = e.target.value}
        else{console.log("here");user.firstName = this.state.user.firstName}
        if(e.target.name === "lastName") {user.lastName = e.target.value}
        else{user.lastName = this.state.user.lastName}
        user.displayName = this.state.user.displayName;
        console.log(user);
        this.setState({user: user});
    }
    render() {
        return (
            <div>
                <h3>Profile Information</h3>
                <form className="settingsForm">
                    <input name="firstName" type="text" value={this.state.user.firstName} onChange={this.handleChange.bind(this)} placeholder="First Name" ref="firstName"/><br />
                    <input name="lastName" type="text" value={this.state.user.lastName}  onChange={this.handleChange.bind(this)} placeholder="Last Name" ref="lastName"/><br />
                    <input name="email" type="email"  defaultValue={base.getAuth().password.email} placeholder="Email Address" ref="email"/><br />
                    {!!this.state.user.displayName ?
                        <span>Display Name: {this.state.user.displayName}</span> :
                        <span><input type="text" placeholder="Display Name" ref="displayName"/>(Once you set it, it's permanent!)</span>}<br />
                    <button onClick={this.saveProfileInformation}>Save</button>
                </form>
                <h3>Join a Team<span>(The team captain must approve</span></h3>
                <form className="settingsForm">
                    <input type="text" placeholder="Team Name" ref="joinTeamName"/><button>Send Request</button>
                </form>
                <h3>Create a Team<span>(You'll be the team captain</span></h3>
                <form className="settingsForm">
                    <input type="text" placeholder="Team Name" ref="joinTeamName"/><button>Create</button>
                </form>
                {!!this.state.team ?
                    <div>
                        <h3>Team Information</h3>
                        <h4>{this.state.team.name}</h4>
                        {this.state.teamMembers}
                    </div>
                    :
                    ""}
            </div>
        );
    }
}
export default Settings;