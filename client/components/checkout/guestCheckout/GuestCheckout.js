import React, { Component } from 'react';

export default class GuestCheckout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: ''
		}
	}

	handleWantsGuest = () => {
		this.props.handleWantsGuest(this.state.name, this.state.email);
	}

	handleNameChange = (e) => this.setState({ name: e.target.value });

	handleEmailChange = (e) => this.setState({ email: e.target.value }); 

	render = () => {
		return (
			<div>
				<h2>Guest Checkout</h2>
				<div>
					{
						!this.props.guestNValidated &&
						<h3>Please enter your full name</h3>
					}
					{
						!this.props.guestEValidated &&
						<h3>Please enter a valid email</h3>
					}
					<div className="input">
						<label htmlFor="name">Full Name</label>
						<input
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							onChange={this.handleNameChange}
							type="text" 
							id="name"
							ref="name"
							value={this.state.name} />
					</div>
					<div className="input">
						<label htmlFor="email">Email</label>
						<input
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							onChange={this.handleEmailChange}
							type="email" 
							id="email"
							ref="email"
							value={this.state.email} />
					</div>
					<button onClick={this.handleWantsGuest}>Next</button>
				</div>
			</div>
		);
	}
}