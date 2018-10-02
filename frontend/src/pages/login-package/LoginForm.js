import React from "react";

class LoginForm extends React.Component{
    //existing stats for login
    //passCheck is to compare against passWord when creating
    //a new user, or reseting a password
    state = {
        userName: "",
        passWord: "",
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        //console.log(this.state);
    };

    render() {
        return (
            <form>
                <input 
                    name="userName"
                    placeholder="User Name"
                    value={this.state.userName}
                    onChange={e => this.change(e)}
                />
                <br />
                <input 
                    name="passWord"
                    placeholder="Password"
                    value={this.state.passWord}
                    onChange={e => this.change(e)}
                />
                <br />
                <button onClick={e => this.onSubmit(e)}>Login</button>

            </form>
        )
    }
}

export default LoginForm