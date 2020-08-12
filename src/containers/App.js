import React from 'react';
import SynthA from '../components/SynthA'
import LoginForm from '../components/LoginForm'

class App extends React.Component {

  state={
    keymappings: {
      a: "C4",
      w: "C#4",
      s: "D4",
      e: "D#4",
      d: "E4",
      f: "F4",
      t: "F#4",
      g: "G4",
      y: "G#4",
      h: "A4",
      u: "A#4", 
      j: "B4",
      k: "C5",
      o: "C#5",
      l: "D5",
      p: "D#5",
      ":": "E5",
      "'": "F5"
    },
    loginDropDown: false, 
    username: "",
    password: ""
  }

  handleLogin = () => {
    this.setState(previousState => {
      return {
        loginDropDown: !previousState.loginDropDown
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.userLogin()
  }

  userLogin() {
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
      .then(json => console.log(json))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleLogin}>Login/Register</button>
        {this.state.loginDropDown ? <LoginForm changeHandler={this.handleChange} submitHandler={this.handleSubmit}/> : null}
        <SynthA keymappings={this.state.keymappings}/>
      </div>
    );
  }
}

export default App;
