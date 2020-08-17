import React from 'react';
import Synth from '../components/Synth'
import LoginForm from '../components/LoginForm'
import {AMSynth, DuoSynth, FMSynth} from 'tone'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from '../components/Navbar';

class App extends React.Component {

  state={
    logout: false, 
    username: "",
    password: "", 
    synth: new AMSynth().toDestination(), 
    user: "", 
    presets: []
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`}
      })
        .then(resp => resp.json())
        .then(json => {
          this.setState({
            user: json.user.id,
            presets: json.presets
          })
        })
        .catch(error => console.log(error))
    }
  }

  handleLogin = (e) => {
    if (e.target.innerText === 'Logout') {
      localStorage.removeItem('token')
      this.setState({user: "", presets: []})
      window.location.reload();
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
        localStorage.setItem('token', json.jwt)
        this.setState({user: json.user.id, presets: json.presets})
        window.location.assign('/')
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
      .then(json => {
        localStorage.setItem('token', json.jwt)
        this.setState({user: json.user.id})
        window.location.assign('/')
      })
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

  addLastPreset = (preset) => {
    let newArray = [...this.state.presets, preset]
    this.setState({presets: newArray})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.user} handleLogin={this.handleLogin} loginDropDown={this.state.loginDropDown} />
          <Route exact path='/' render={props => (<Synth {...props} synth={this.state.synth} user={this.state.user} presets={this.state.presets} addLastPreset={this.addLastPreset}/>)}/>
          <Route exact path='/FMSynth' render={props => (<FMSynth {...props} synth={this.state.synth} user={this.state.user} presets={this.state.presets} addLastPreset={this.addLastPreset}/>)}/>
          <Route exact path='/AMSynth' render={props => (<AMSynth {...props} synth={this.state.synth} user={this.state.user} presets={this.state.presets} addLastPreset={this.addLastPreset}/>)}/>
          <Route exact path='/login' render={props => (<LoginForm {...props} changeHandler={this.handleChange} submitHandler={this.handleSubmit}/>)}/>
        </div>
      </Router>
    );
  }
}

export default App;
