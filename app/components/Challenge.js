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
            solved: false,
            challenge: [],
            user: [],
            isLoading: true
        };
    }
    componentWillMount(){
        this.loadListeners(this.props.params.id);
    }
    componentWillReceiveProps(nextProps){
        if(!!this.challengeRef) {
            base.removeBinding(this.challengeRef);
        }
        if(!!this.solutionRef){
            base.removeBinding(this.solutionRef);
        }
        this.loadListeners(nextProps.params.id);

    }
    loadListeners(challengeID){
        this.challengeRef = base.syncState('challenges/' + challengeID, {
            context: this,
            state: 'challenge',
            then(){
                this.setState({isLoading: false});
            }
        });

        base.fetch('users/' + base.getAuth().uid, {
            context: this,
            then(data){
                this.setState({user: data});
                this.solutionRef = base.listenTo('/solutions/' + challengeID + '/' + data.team + '/', {
                    context: this,
                    then(data){
                        this.isSolved(data);
                    }
                });
            }
        });
    }
    isSolved(data){
        if (typeof data === "boolean" && data === true) {
            this.setState({solved: true});
        } else {
            this.setState({solved: false});
        }
        this.setState({isLoading: false});
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
            })
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
    componentWillUnmount(){
        base.removeBinding(this.challengeRef);
        base.removeBinding(this.solutionRef);
    }
    render(){
        return (
            <div>
                <h4>{this.state.challenge.title}</h4>
                <p>{this.state.challenge.content}</p>
                {!!this.state.flashMessage.text === true ? <FlashMessage flashMessage={this.state.flashMessage} /> : ""}
                {!!this.state.isLoading === true ?
                    <p>Loading...</p> :
                        !!this.state.solved === true ?
                            <p>Solved!</p> :
                            <form onSubmit={this.handleSubmit.bind(this)}>
                            <label>Flag:</label><input type="text" ref="challengeFlag" /><br />
                            <button type="submit">Submit</button>
                            </form>
                }
            </div>
        )
    }
};

export default Challenge;