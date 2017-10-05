import React, { Component} from 'react';

export default class BillingInfo extends Component {

	submitOrder = () => {
		this.props.submitOrder(this.refs);
	}
	
	render = () => {
		return (
			<div className="billing">
				<h2 id="bitle">Billing Info:</h2>
				<div>
				  {
				  	!this.props.billingValidated &&
				  	<h3>*Please check your inputs!</h3>
				  }
					<h3>Card Number</h3>
					<div className="input">
						<label htmlFor="cr">Credit/Debit</label>
						<input
							ref="cr"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="number" 
							id="cr" />
					</div>
					<h3>Expiration & Security</h3>
					<div className="input month">
						<label htmlFor="month">Month</label>
						<input
							ref="month"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="number" 
							id="month" />
					</div>
					<div className="input year">
						<label htmlFor="year">Year</label>
						<input
							ref="year"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="number" 
							id="year" />
					</div>
					<div className="input cv">
						<label htmlFor="cv">CVV</label>
						<input
							ref="cv"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="number" 
							id="cv" />
					</div>
					<h3>Billing Info</h3>
					<div className="checkboxes">
						<h4>Same as shipping?</h4>
						<div>
							<label>Yes</label>
							<input 
								type="checkbox" 
								checked={this.props.sameAsShipping}
								onChange={this.props.noBilling} />
							<label>No</label>
							<input 
								type="checkbox" 
								checked={!this.props.sameAsShipping}
								onChange={this.props.noBilling} />
						</div>
					</div>
					{
						!this.props.sameAsShipping &&
						<div className="input">
							<label htmlFor="bname">Name</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="bname"
								ref="bname" />
						</div>
					}
					{
						!this.props.sameAsShipping &&
						<div className="input">
							<label htmlFor="badl1">Address line 1</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="badl1"
								ref="badl1" />
						</div>
					}
					{
						!this.props.sameAsShipping &&
						<div className="input">
							<label htmlFor="badl2">Address line 2</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="badl2"
								ref="badl2" />
						</div>
					}
					{
						!this.props.sameAsShipping &&
						<div className="input">
							<label htmlFor="bcity">City</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="bcity"
								ref="bcity" />
						</div>
					}
					{
						!this.props.sameAsShipping &&
						<div className="input state">
							<label htmlFor="bstate">State</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur}
								onChange={this.props.autoCompleteState}
								type="text" 
								id="bstate"
								ref="bstate" />
							<div className="autocomp">
								{
									this.props.statesComplete2.map((state, i) => {
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
						!this.props.sameAsShipping &&
						<div className="input zip">
							<label htmlFor="bzip">Zipcode</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur}
								maxLength="5" 
								type="number" 
								id="bzip"
								ref="bzip" />
						</div>
					}
					<button 
						className={this.props.buttonClasses}
						onClick={this.submitOrder}>Submit Order</button>
				</div>
			</div>
		);
	}
}