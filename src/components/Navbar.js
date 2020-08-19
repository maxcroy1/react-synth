import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../borpo.png'




export default class Navbar extends React.Component{
    render(){
        return(
            <div className="nav-container">
                <div className="inner-nav">
                    <div className="left-nav">
                        <NavLink to='/' exact className={"inner-left"}>Synth</NavLink>
                        <NavLink to='/AMSynth' exact className={"inner-left"}>AMSynth</NavLink>
                        <NavLink to='/FMSynth' exact className={"inner-left"}>FMSynth</NavLink>
                        <NavLink to='/DuoSynth' exact className={"inner-left"}>DuoSynth</NavLink>
                    </div>
                    <div className="center-nav">
                        <img src={Logo} className={"logo-image "}/>
                    </div>
                    <div className="right-nav"> 
                    {!this.props.user ? <NavLink to='/login' exact className={"right-nav"}>Login/Register</NavLink> : <div className={"style-nav-1 right"} onClick={event => this.props.handleLogin(event)}>Logout</div>}
                    </div>
                </div>
            </div>
        )
    }
}