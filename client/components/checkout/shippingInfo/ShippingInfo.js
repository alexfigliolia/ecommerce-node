import React, { Component } from 'react';

export default class ShippingInfo extends Component {

	toBilling = () => {
		this.props.toBilling(this.refs);
	}

	render = () => {
		return(
			<div className="guest">
				<h2>Shipping Info:</h2>
				<div>
					{
						!this.props.shippingValidated &&
						<h3>*Please check your shipping info!*</h3>
					}
					{
						this.props.wantsGuest &&
						<h3>Shipping Info:</h3>
					}

					{
						(this.props.wantsGuest || this.props.updatingInfo) ?
						<div className="input">
							<label htmlFor="sname">Name</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="sname"
								ref="sname" />
						</div>
						:""
					}

					{
						(this.props.wantsGuest || this.props.updatingInfo) ?
						<div className="input">
							<label htmlFor="adl1">Address line 1</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="adl1"
								ref="adl1" />
						</div>
						:""
					}
					{
						(this.props.wantsGuest || this.props.updatingInfo) ?
						<div className="input">
							<label htmlFor="adl2">Address line 2</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="adl2"
								ref="adl2" />
						</div>
						: ""
					}
					
					{
						(this.props.wantsGuest || this.props.updatingInfo) ?
						<div className="input">
							<label htmlFor="scity">City</label>
							<input
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur} 
								type="text" 
								id="scity"
								ref="scity" />
						</div>
						:""
					}

					{
						(this.props.wantsGuest || this.props.updatingInfo) ?
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
						:""
					}

					{
						(this.props.wantsGuest || this.props.updatingInfo) ?
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
						: ""
					}
					<button onClick={this.toBilling}>Next</button>
				</div>
			</div>
		);
	}
}