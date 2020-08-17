import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white',
  }

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <h1>ReactSynth</h1>
                <NavLink to='/' exact style={link} activeStyle={{background: 'darkblue'}}>Synth</NavLink>
                <NavLink to='/AMSynth' exact style={link} activeStyle={{background: 'darkblue'}}>AMSynth</NavLink>
                <NavLink to='/FMSynth' exact style={link} activeStyle={{background: 'darkblue'}}>FMSynth</NavLink>
                <NavLink to='/DuoSynth' exact style={link} activeStyle={{background: 'darkblue'}}>DuoSynth</NavLink>
                {!this.props.user ? <NavLink to='/login' exact style={link} activeStyle={{background: 'darkblue'}}>Login/Register</NavLink> : <div style={link} activeStyle={{background: 'darkblue'}} onClick={event => this.props.handleLogin(event)}>Logout</div>}
            </div>
        )
    }
}