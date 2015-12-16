import React from 'react';

class Challenge extends React.Component{
    render(){
        var item = this.props.item;
        return (
            <div>
                <h4>{item.title}</h4>
                <p>{item.content}</p>

            </div>
        )
    }
};

export default Challenge;