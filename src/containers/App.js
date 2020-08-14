import React from 'react';
import Synth from '../components/Synth'
import LoginForm from '../components/LoginForm'
import {AMSynth, DuoSynth, FMSynth} from 'tone'

class App extends React.Component {

  state={
    loginDropDown: false, 
    username: "",
    password: "", 
    synth: new AMSynth().toDestination(), 
    user: "", 
    presets: []
  }

  handleLogin = (e) => {
    if (e.target.innerText === 'Login/Register') {
      this.setState(previousState => {
        return {
          loginDropDown: !previousState.loginDropDown
        }
      })
    } else if (e.target.innerText === 'Logout') {
      this.setState({user: "", presets: []})
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.value === "Register"){
      this.userRegister()
    }else if(e.target.value === "Login"){
      this.userLogin()
    }
    e.target.parentElement.reset()
    this.setState(previousState => {
      return {
        loginDropDown: !previousState.loginDropDown
      }
    })
  }

  userLogin = () => {
    let formData = {
      user:{
        username: this.state.username,
        password: this.state.password
      }
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch("http://localhost:3000/api/v1/login", configObj)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        this.setState({user: json.user.id, presets: json.presets})
      })
      .catch(error => console.log(error))
  }

  userRegister() {
    let formData = {
      user:{
        username: this.state.username,
        password: this.state.password
      }
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch("http://localhost:3000/api/v1/users", configObj)
      .then(resp => resp.json())
      .then(json => this.setState({user: json.user.id}))
      .catch(error => console.log(error))
  }

  synthSelect = (e) => {
    this.state.synth.disconnect()
    if (e.target.id === "A") {
      this.setState({synth: new AMSynth()})
    } else if (e.target.id === "B") {
      this.setState({synth: new DuoSynth()})
    } else if (e.target.id === "C") {
      this.setState({synth: new FMSynth()})
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={event => this.handleLogin(event)}>{this.state.user ? 'Logout' : 'Login/Register'}</button>
        {this.state.loginDropDown ? <LoginForm changeHandler={this.handleChange} submitHandler={this.handleSubmit}/> : null}
        <button id="A" onClick={this.synthSelect}>Synth A</button>
        <button id="B" onClick={this.synthSelect}>Synth B</button>
        <button id="C" onClick={this.synthSelect}>Synth C</button>
        <Synth style={{margin: "auto"}} synth={this.state.synth} user={this.state.user} presets={this.state.presets}/>
      </div>
    );
  }
}

export default App;
