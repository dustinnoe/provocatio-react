var React = require('react');
import Menu from './Menu'
import ChallengeBoardItem from './ChallengeBoardItem';

var Rebase = require('re-base');
var Auth = require('../utils/Auth.js');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');

class ChallengeBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            challenges: [],
            loading: true
        }
    }
    componentDidMount(){
        this.ref = base.syncState('challenges', {
            context: this,
            state: 'challenges',
            asArray: true,
            then(){
                this.setState({loading: false})
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
                <Menu />
                <h3>Challenge Board</h3>
                {this.state.loading === true ? <h3> LOADING... </h3> : <ChallengeBoardItem items={this.state.challenges} />}
                <div id="challengeDesc"></div>
            </div>
        );
    }
}

export default ChallengeBoard;