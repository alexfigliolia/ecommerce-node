import React, { Component } from 'react';

export default class ShippingInfo extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	handleWantsGuest = () => {
		const n = this.refs.name.value;
		const e = this.refs.email.value;
		this.props.handleWantsGuest(n, e);
	}

	toBilling = () => {
		this.props.toBilling(this.refs);
	}

	render = () => {
		return(
			<div className="guest">
				<h2>Guest Checkout</h2>
				<div>
					{
						!this.props.shippingValidated &&
						<h3>*Please check your shipping info!*</h3>
					}
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
					{
						this.props.wantsGuest &&
						<h3>Shipping Info:</h3>
					}

					{
						this.props.wantsGuest &&
						<div className="input">
							<label htmlFor="sname">Name</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="sname"
								ref="sname" />
						</div>
					}

					{
						this.props.wantsGuest &&
						<div className="input">
							<label htmlFor="adl1">Address line 1</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="adl1"
								ref="adl1" />
						</div>
					}
					{
						this.props.wantsGuest &&
						<div className="input">
							<label htmlFor="adl2">Address line 2</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="adl2"
								ref="adl2" />
						</div>
					}
					
					{
						this.props.wantsGuest &&
						<div className="input">
							<label htmlFor="scity">City</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="scity"
								ref="scity" />
						</div>
					}

					{
						this.props.wantsGuest &&
						<div className="input state">
							<label htmlFor="sstate">State</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur}
								onChange={this.props.autoCompleteState}
								type="text" 
								id="sstate"
								ref="sstate" />
							<div className="autocomp">
								{
									this.props.statesComplete.map((state, i) => {
										if(i < 4) return <div 
																				onClick={this.props.autoCompClick}
																				data-state={state}
																				key={i}>{state}</div>
									})
								}
							</div>
						</div>
					}

					{
						this.props.wantsGuest && 
						<div className="input zip">
							<label htmlFor="szip">Zipcode</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur}
								maxLength="5" 
								type="number" 
								id="szip"
								ref="szip" />
						</div>
					}
					<button onClick={!this.props.wantsGuest ? this.handleWantsGuest : this.toBilling}>Next</button>
				</div>
			</div>
		);
	}
}