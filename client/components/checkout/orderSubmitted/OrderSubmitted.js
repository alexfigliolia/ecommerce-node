import React, { Component } from 'react';

export default class OrderSubmitted extends Component {
	
	signUp = (e) => {
		e.persist();
		this.props.signUp(e, this.refs);
	}

	render = () => {
		return (
			<div className="congrats">
				<div>
					<h2>Congrats!</h2>
					<p>We have received your order! You will receive email confirmation from us shortly</p>
					{
						!this.props.loggedIn &&
						<p>In the meantime you may return home or enter a password below for a speedy checkout experence in the future</p>
					}
					{
						!this.props.loggedIn &&
						<div>
							<label htmlFor="pwc">Password</label>
							<input 
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur}
								id="pwc" 
								ref="passcode"
								type="password" />
						</div>
					}
					<button 
						onClick={this.props.nav}
						data-page="Home">Go Home</button>
					{
						!this.props.loggedIn &&
						<button
							data-page="Home" 
							onClick={this.signUp}>Sign Up</button>
					}
				</div>
			</div>
		);
	}
}