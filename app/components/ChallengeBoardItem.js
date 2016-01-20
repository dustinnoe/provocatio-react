import React from 'react';
import {Link} from 'react-router';

class ChallengeBoardItem extends React.Component{
    render(){
        var createItem = function(item){
            return <li key={item.key}><Link to={'/challenge/' + item.key}>{item.number}</Link> - {item.currentValue} pts</li>;
        };
        return <ul>{this.props.challenges.map(createItem)}</ul>;
    }
}

export default ChallengeBoardItem;