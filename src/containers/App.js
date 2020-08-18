import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Synth from './Synth'
import AM_Synth from './AM_Synth'
import FM_Synth from './FM_Synth'
import Duo_Synth from './Duo_Synth'
import LoginForm from '../components/LoginForm'
import {Reverb, Gain, BitCrusher, Chebyshev} from 'tone';

class App extends React.Component {

  state={
    username: "",
    password: "", 
    user: "", 
    presets: [], 
    keymappings: {
      a: "C4",
      w: "Csh4",
      s: "D4",
      e: "Dsh4",
      d: "E4",
      f: "F4",
      t: "Fsh4",
      g: "G4",
      y: "Gsh4",
      h: "A4",
      u: "Ash4", 
      j: "B4",
      k: "C5",
      o: "Csh5",
      l: "D5",
      p: "Dsh5",
      ";": "E5",
      "'": "F5"
    },
    reverb: {
      wet: 0,
      decay: 0.1
    },
    gain: 0.5,
    bitCrusher: -16
  }

  // Effects Handlers
  wetSlider = (e) => {
    this.setState({
      reverb: {
        ...this.state.reverb,
        wet: parseFloat(e.target.value)
      }
    })
  }

  decaySlider = (e) => {
    this.setState({
      reverb: {
        ...this.state.reverb,
        decay: parseFloat(e.target.value)
      }
    })
  }

  gainSlider = (e) => {
    this.setState({gain: parseFloat(e.target.value)})
}

  bitCrusherSlider = (e) => {
    this.setState({bitCrusher: parseFloat(e.target.value)})
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

  addLastPreset = (preset) => {
    let newArray = [...this.state.presets, preset]
    this.setState({presets: newArray})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.user} handleLogin={this.handleLogin} loginDropDown={this.state.loginDropDown} />
          <Route exact path='/' render={props => (<Synth {...props} user={this.state.user} presets={this.state.presets} addLastPreset={this.addLastPreset}/>)}/>
          <Route exact path='/FMSynth' render={props => (<FM_Synth {...props} user={this.state.user} presets={this.state.presets} addLastPreset={this.addLastPreset} keymappings={this.state.keymappings}/>)}/>
          <Route exact path='/AMSynth' render={props => <AM_Synth user={this.state.user} presets={this.state.presets} addLastPreset={this.addLastPreset} keymappings={this.state.keymappings} reverb={new Reverb({"wet": this.state.reverb.wet, "decay": this.state.reverb.decay}).toDestination()} reverbSettings={this.state.reverb} wetSlider={this.wetSlider} decaySlider={this.decaySlider} gain={new Gain({"gain": this.state.gain}).toDestination()} gainSetting={this.state.gain} gainSlider={this.gainSlider} bitCrusher={new BitCrusher({'bits': -(this.state.bitCrusher)}).toDestination()} bitCrusherSettings={this.state.bitCrusher} bitCrusherSlider={this.bitCrusherSlider}/>}/>
          <Route exact path='/DuoSynth' render={props => (<Duo_Synth {...props} user={this.state.user} presets={this.state.presets} addLastPreset={this.addLastPreset} keymappings={this.state.keymappings}/>)}/>
          <Route exact path='/login' render={props => (<LoginForm {...props} changeHandler={this.handleChange} submitHandler={this.handleSubmit}/>)} keymappings={this.state.keymappings}/>
        </div>
      </Router>
    )
  }
}

export default App;
