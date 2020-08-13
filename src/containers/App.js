import React from 'react';
import SynthA from '../components/SynthA'
import LoginForm from '../components/LoginForm'

class App extends React.Component {

  state={
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
      .then(json => console.log(json))
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
      .then(json => console.log(json))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleLogin}>Login/Register</button>
        {this.state.loginDropDown ? <LoginForm changeHandler={this.handleChange} submitHandler={this.handleSubmit}/> : null}
        <SynthA keymappings={this.state.keymappings} style={{margin: "auto"}}/>
      </div>
    );
  }
}

export default App;