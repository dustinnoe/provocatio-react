import React from 'react';
import ReactDOM from 'react-dom';

class LeaderBoardItem extends React.Component{
    render(){
        var createItem = function(item){
            return <tr key={item.key}><td>{item.key}</td><td>{item.points}</td></tr>;
        }.bind(this);
        return <tbody>{this.props.leaders.map(createItem)}</tbody>;
    }
}

export default LeaderBoardItem;