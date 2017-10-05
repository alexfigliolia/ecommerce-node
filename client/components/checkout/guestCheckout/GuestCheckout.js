import React, { Component } from 'react';

export default class GuestCheckout extends Component {

	handleWantsGuest = () => {
		this.props.handleWantsGuest(this.refs);
	}

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
							type="text" 
							id="name"
							ref="name" />
					</div>
					<div className="input">
						<label htmlFor="email">Email</label>
						<input
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="email" 
							id="email"
							ref="email" />
					</div>
					<button onClick={this.handleWantsGuest}>Next</button>
				</div>
			</div>
		);
	}
}