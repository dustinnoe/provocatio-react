import React from 'react';
import ReactDOM from 'react-dom'
import Challenge from './Challenge';

class ChallengeBoardItem extends React.Component{
    loadChallenge(user, item){
        ReactDOM.render((
            <Challenge item={item} user={user} />
        ), document.getElementById('challengeDesc'));
    }
    render(){
        var lc = this.loadChallenge;
        var aStyle = {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
        var createItem = function(item){
            return <li key={item.key}><a style={aStyle} onClick={lc.bind(this, this.props.user, item)}>{item.title}</a> - {item.currentValue} points</li>;
        }.bind(this);
        return <ul>{this.props.items.map(createItem)}</ul>;
    }
}

export default ChallengeBoardItem;