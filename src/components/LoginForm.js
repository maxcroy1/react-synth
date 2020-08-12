import React from 'react';

export default class LoginForm extends React.Component {
    render(){
        return(
            <form>
                <input name='username' type='text' placeholder='Username' onChange={this.props.changeHandler}></input>
                <input name='password' type='password' placeholder='Password' onChange={this.props.changeHandler}></input>
                <input type="submit" value="Register" onClick={this.props.submitHandler}></input>
                <input type="submit" value="Login" onClick={this.props.submitHandler}></input>
            </form>
        )
    }
}