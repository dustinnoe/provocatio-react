import React from 'react';
import ReactDOM from 'react-dom';
import ChallengeBoard from './components/ChallengeBoard';
import LeaderBoard from './components/LeaderBoard';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Register from './components/Register';
import Settings from './components/Settings';
import Home from './components/Home';
import Menu from './components/Menu';
import Header from './components/Header';
import { Router, Route, Link} from 'react-router';

class App extends React.Component{
    render(){
        return (
            <div>
                <Header />
                <Menu />
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
            <Route path="settings" component={Settings}/>
            <Route path="*" component={Home}/>
        </Route>
    </Router>
), document.getElementById('app'));