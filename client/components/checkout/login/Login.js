import React, { Component } from 'react';

export default class Login extends Component {

	handleLogin = () => {
		const e = this.refs.em.value;
		const p = this.refs.pw.value;
		this.props.handleLogin(e, p);
	}

	render = () => {
		return (
			<div className="login">
				<h2>Login</h2>
				<div>
					{
						!this.props.loginEValidated &&
						<h3>Please enter a valid email</h3>
					}
					{
						!this.props.loginPValidated &&
						<h3>Your password must be at least 4 characters</h3>
					}
					{
						this.props.loginErrors !== "" &&
						<h3>{this.props.loginErrors}</h3>
					}
					<div className="input">
						<label htmlFor="em">Email</label>
						<input
							ref="em"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="email" 
							id="em" />
					</div>
					<div className="input">
						<label htmlFor="pw">Password</label>
						<input
							ref="pw"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="password" 
							id="pw" />
					</div>
					<button onClick={this.handleLogin}>Login</button>
				</div>
			</div>
		);
	}
}