import React from 'react';

class FlashMessage extends React.Component{
    render(){
        var divStyle = {
            color: 'red',
            fontWeight: 'bold'
        }

        if (this.props.flashMessage.type === "success"){
            divStyle.color = "darkgreen"
        }

        return (
            <div style={divStyle}>
                {this.props.flashMessage.text}
            </div>
        )
    }
};

export default FlashMessage;