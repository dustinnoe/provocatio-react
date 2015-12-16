import React from 'react';

class FlashMessage extends React.Component{
    render(){
        return (
            <div className={this.props.message.class}>
                {this.props.message.text}
            </div>
        )
    }
};

export default FlashMessage;