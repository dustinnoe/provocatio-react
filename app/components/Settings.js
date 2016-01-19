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
                let newArray = this.state.teamMembers.slice();
                newArray.push(displayName);
                this.setState({teamMembers:newArray});
            }
        })
    }
    loadTeamState(team){
        this.teamRef = base.syncState('teams/' + team, {
            context: this,
            state: 'team',
            then(){
                for (let member in this.state.team.members) {
                    if (this.state.team.members.hasOwnProperty(member)) {
                        this.fetchUserDisplayName(member);
                    }
                }
            }
        })
    }
    saveProfileInformation(){
        let uid = base.getAuth().uid;
        base.post('users/' + uid + '/firstName', {
            data: this.refs.firstName.value
        });
        base.post('users/' + uid + '/lastName', {
            data: this.refs.lastName.value
        });
        if(!!this.refs.displayName.value){
            base.post('users/' + uid + '/displayName', {
                data: this.refs.displayName.value
            })
        }
    }
    handleJoinTeam(){
        // Check if Team Name is already taken
        let teamName = this.refs.joinTeamName.value;
        // It would be great if re-base calls were promisified
        base.fetch('teams/' + teamName + '/exists', {
            context: this,
            then(data){
                console.log(data);
                base.post('teams/' + teamName + '/joinRequest/' + base.getAuth().uid, {
                    data: false,
                    then(err){
                        if (err){
                            console.log(err);
                        } else {
                            base.post('users/' + base.getAuth().uid + '/teamRequest', {
                                data: teamName,
                                then(){
                                    // Create a flash message to display
                                    console.log("Submitted join team request");
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    handleCreateTeam(){
        let teamName = this.refs.createTeamName.value;
        let teamData = {
            exists: true,
            captain: base.getAuth().uid,
            members: {}
        }
        teamData.members[base.getAuth().uid] = true;

        base.fetch('teams/' + teamName + '/exists', {
            context: this,
            then(data){
                if(!data) {
                     base.post('teams/' + teamName, {
                         data: teamData,
                         then(){
                             base.post('users/' + base.getAuth().uid + '/team', {
                                 data: teamName,
                                 then(){
                                     console.log("Created team " + teamName);
                                 }
                             });
                         }
                     });
                }
            }
        });
    }
    handleChange(e){
        let user = {};
        if(e.target.name === "firstName") { user.firstName = e.target.value }
        else { user.firstName = this.state.user.firstName }
        if(e.target.name === "lastName") { user.lastName = e.target.value }
        else{ user.lastName = this.state.user.lastName }
        user.displayName = this.state.user.displayName;
        this.setState({user: user});
    }
    render() {
        let team;
        let displayName;

        if (!this.state.user.team){
            team = (
                <div>
                    <h3>Join a Team<span> (The team captain must approve)</span></h3>
                    <form className="settingsForm">
                        <input type="text" placeholder="Team Name" ref="joinTeamName"/><button onClick={this.handleJoinTeam.bind(this)}>Send Request</button>
                    </form>
                    <h3>Create a Team <span>(You'll be the team captain)</span></h3>
                    <form className="settingsForm">
                        <input type="text" placeholder="Team Name" ref="createTeamName"/><button onClick={this.handleCreateTeam.bind(this)}>Create</button>
                    </form>
                </div>
            );
        } else {
            team = (
                <div>
                    <h3>Team Information</h3>
                    <h4>{this.state.user.team}</h4>
                    {this.state.teamMembers}
                </div>
            );
        }

        if (!!this.state.user.displayName){
            displayName = (
                <span>Display Name: {this.state.user.displayName}</span>
            );
        } else {
            displayName = (
                <span><input type="text" placeholder="Display Name" ref="displayName"/>(Once you set it, it's permanent!)</span>
            );
        }

        return (
            <div>
                <h3>Profile Information</h3>
                <form className="settingsForm">
                    <input name="firstName" type="text" value={this.state.user.firstName} onChange={this.handleChange.bind(this)} placeholder="First Name" ref="firstName"/><br />
                    <input name="lastName" type="text" value={this.state.user.lastName}  onChange={this.handleChange.bind(this)} placeholder="Last Name" ref="lastName"/><br />
                    {displayName}<br />
                    <span>Email: {base.getAuth().password.email}</span><br />
                    <button onClick={this.saveProfileInformation.bind(this)}>Save</button>
                </form>
                {team}
            </div>
        );
    }
}
export default Settings;