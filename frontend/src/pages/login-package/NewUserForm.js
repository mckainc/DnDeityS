import React from "react";

class NewUserForm extends React.Component{
    //existing stats for login
    //passCheck is to compare against passWord when creating
    //a new user, or reseting a password
    state = {
        userName: "",
        passWord: "",
        passCheck: "",
        email: "",
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
                <h2>New User Name</h2>
                <input 
                    name="userName"
                    placeholder="User Name"
                    value={this.state.userName}
                    onChange={e => this.change(e)}
                />
                <br />
                <h2>User Email</h2>
                <input 
                    name="email"
                    placeholder="user@purdue.edu"
                    value={this.state.email}
                    onChange={e => this.change(e)}
                />
                <br />
                <h2>Password</h2>
                <input 
                    name="passWord"
                    placeholder="friendlykitty"
                    value={this.state.passWord}
                    onChange={e => this.change(e)}
                />
                <br />
                <h2>Conferm Password</h2>
                <input 
                    name="passCheck"
                    placeholder="friendlykitty"
                    value={this.state.passCheck}
                    onChange={e => this.change(e)}
                />
                <br />
                <button onClick={e => this.onSubmit(e)}>Submit</button>

            </form>
        )
    }
}

export default NewUserForm