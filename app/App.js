
import React from 'react'
import ReactDOM from 'react-dom'
import Challenge from './components/Challenge'
import LeaderBoard from './components/LeaderBoard'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import Register from './components/Register'
import Settings from './components/Settings'
import Home from './components/Home'
import Menu from './components/Menu'
import Header from './components/Header'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import base from "./utils/Rebase"

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            challenges: [],
            user: null,
            loading: true
        };

    }
    componentDidMount(){
        this.ref = base.syncState('challenges', {
            context: this,
            state: 'challenges',
            asArray: true,
            then(){
            }
        });
        base.fetch('users/' + base.getAuth().uid, {
            context: this,
            then(data){
                this.setState({user: data});
            }
        });
    }
    render(){
        return (
            <div>
                <Header />
                <Menu challenges={this.state.challenges} />
                <div id="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/signout" component={SignOut} />
            <Route path="/challenge/:id" component={Challenge} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/register" component={Register} />
            <Route path="/settings" component={Settings} />
        </Route>
    </Router>
), document.getElementById('app'));