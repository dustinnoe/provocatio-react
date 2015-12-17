import React from 'react';
import ReactDOM from 'react-dom';
import ChallengeBoard from './components/ChallengeBoard';
import LeaderBoard from './components/LeaderBoard';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Register from './components/Register';
import Home from './components/Home';
import Menu from './components/Menu';
import { Router, Route, Link} from 'react-router';
var Rebase = require('re-base');
var base = Rebase.createClass('https://provocatio.firebaseio.com/');

class App extends React.Component{
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <Route path="signin" component={SignIn}/>
            <Route path="signout" component={SignOut}/>
            <Route path="challenges" component={ChallengeBoard}/>
            <Route path="leaderboard" component={LeaderBoard}/>
            <Route path="register" component={Register}/>
            <Route path="*" component={Home}/>
        </Route>
    </Router>
), document.getElementById('app'));