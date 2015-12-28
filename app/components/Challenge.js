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
            isLoading: true
        };

        this.ref = base.listenTo('/solutions/' + this.props.item.key + '/' + this.props.user.team + '/', {
            context: this,
            then(data){
                this.isSolved(data);
            }
        });
    }
    //Updates the state when a different challenge is loaded
    componentWillReceiveProps(nextProps){
        this.setState({
            flashMessage: {
                text: null
            },
            isLoading: true
        });

        base.removeBinding(this.ref);
        this.ref = base.listenTo('solutions/' + nextProps.item.key + '/' + this.props.user.team + '/', {
            context: this,
            then(data){
                this.isSolved(data);
            }
        });
        if(this.refs.challengeFlag) {
            this.refs.challengeFlag.value = "";
        }
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
                    teamID: this.props.user.team,
                    challengeID: this.props.item.key,
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
    render(){
        var item = this.props.item;
        return (
            <div>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
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