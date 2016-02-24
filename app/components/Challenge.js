import React from 'react';
import FlashMessage from './FlashMessage';
import base from "../utils/Rebase";

class Challenge extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flashMessage: {
                text: null
            },
            challenges: {},
            solutions: {},
            user: [],
            isLoading: true,
            currentChallenge: null
        };
    }
    componentWillMount(){
        // Load all challenges and team solutions
        if (!this.hasOwnProperty('challengeRef')) {
            try {
                this.challengeRef = base.syncState('challenges/', {
                    context: this,
                    state: 'challenges',
                    then(){
                        this.setState({currentChallenge: this.props.params.id});
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }

        try {
            base.fetch('users/' + base.getAuth().uid, {
                context: this,
                then(data){
                    this.setState({user: data});
                    if (!this.hasOwnProperty('solutionRef')) {
                        try {
                            this.solutionRef = base.syncState('teams/' + data.team + '/solutions', {
                                context: this,
                                state: 'solutions',
                                then(){
                                    this.setState({isLoading: false});
                                }
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            });
        } catch(err){
            console.log(err);
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({currentChallenge: nextProps.params.id});
    }
    handleSubmit(e){
        e.preventDefault();
        var flag = this.refs.challengeFlag.value;
        if (flag === ''){
            this.setState({
                flashMessage: {
                    text: "Submitting nothing isn't going to help you!"
                }
            });
        } else {
            base.push('submissions/',{
                data: {
                    teamID: this.state.user.team,
                    challengeID: this.props.params.id,
                    flag: this.refs.challengeFlag.value,
                    submittedAt: Firebase.ServerValue.TIMESTAMP
                },
                then(){
                }
            });
            this.setState({
                flashMessage: {
                    text: null
                }
            });

            if(!!this.refs.challengeFlag) {
                this.refs.challengeFlag.value = "";
            }
        }
    }
    componentWillUnmount() {
        try{
            base.removeBinding(this.challengeRef);
        } catch (err){
            console.log(err);
        }
        try{
            base.removeBinding(this.solutionRef);
        } catch(err){
            console.log(err);
        }
    }
    render(){
        var challenge = this.state.challenges[this.state.currentChallenge];
        let solvedStyle = {
            font: 'bold 36pt serif', color: 'green'
        }
        return (
            <div>
                {!!this.state.flashMessage.text === true ? <FlashMessage flashMessage={this.state.flashMessage} /> : ""}
                {!!this.state.isLoading === true ?
                    <img src="floating_rays.gif" /> :
                    <div>
                        <h4>{challenge.title}</h4>
                        <p>{challenge.content}</p>
                    {!!this.state.solutions[this.state.currentChallenge] === true ?
                        <p style={solvedStyle}>SOLVED!</p> :
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <label>Flag:</label><input type="text" ref="challengeFlag"/><br />
                            <button type="submit">Submit</button>
                        </form>
                    }
                    </div>
                }
            </div>
        )
    }
};

export default Challenge;