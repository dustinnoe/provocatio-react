import React from 'react'
import { Link } from 'react-router'

class SignedOutMenu extends React.Component{
    render(){
        return(
            <ul>
                <li><Link to={'/register'}>Register</Link></li>
                <li><Link to={'/signin'}>Sign In</Link></li>
            </ul>
        )
    }
}

export default SignedOutMenu