var React = require('react');
import ReactDOM from 'react-dom'
import Challenge from '../components/Challenge';

class ChallengeBoardItem extends React.Component{
    loadChallenge(item){
        ReactDOM.render((
            <Challenge item={item} />
        ), document.getElementById('challengeDesc'));
    }
    render(){
        var lc = this.loadChallenge;
        var aStyle = {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
        var createItem = function(item){
            return <li key={item.key}><a style={aStyle} onClick={lc.bind(this, item)}>{item.title}</a> - {item.currentValue} points</li>;
        };
        return <ul>{this.props.items.map(createItem)}</ul>;
    }
}

export default ChallengeBoardItem;