import React from 'react';

export default class loginForm extends React.Component {
    state = {
        userName: '',
        password: '',
    }

    render() {
        return (
            <form>
                <input placeholder='Username' value={this.state.userName} 
                onChange={e => this.setState({userName: e.target.value})}/> 
            </form>
        );
    }
}