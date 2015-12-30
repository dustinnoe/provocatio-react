import React from 'react';
import Menu from './Menu'

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <p>Welcome to the Provocatio Capture the Flag (CTF) platform</p>
            </div>
        )
    }
};

export default Home;