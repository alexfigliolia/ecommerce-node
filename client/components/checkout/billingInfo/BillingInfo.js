import React, { Component} from 'react';
import { toTitleCase } from '../../../../helpers/helpers';

export default class BillingInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			card: '',
			month: '',
			year: '',
			sec: '',
			name: '',
			adl1: '',
			adl2: '',
			city: '',
			state: '',
			zip: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			card: nextProps.loggedIn ? nextProps.user.paymentInfo.card : '',
			month: nextProps.loggedIn ? nextProps.user.paymentInfo.expirationMonth : '',
			year: nextProps.loggedIn ? nextProps.user.paymentInfo.expirationYear : '',
			sec: nextProps.loggedIn ? nextProps.user.paymentInfo.cvv : '',
			name: nextProps.loggedIn ? nextProps.user.billingInfo.name : '',
			adl1: nextProps.loggedIn ? nextProps.user.billingInfo.address : '',
			adl2: nextProps.loggedIn ? nextProps.user.billingInfo.address2 : '',
			city: nextProps.loggedIn ? nextProps.user.billingInfo.city : '',
			state: nextProps.loggedIn ? nextProps.user.billingInfo.state : '',
			zip: nextProps.loggedIn ? nextProps.user.billingInfo.zip : ''
		});
	}

	componentDidMount() {
		if(this.props.loggedIn) {
			this.setState({
				card: this.props.user.paymentInfo.card,
				month: this.props.user.paymentInfo.expirationMonth,
				year: this.props.user.paymentInfo.expirationYear,
				sec: this.props.user.paymentInfo.cvv,
				name: this.props.user.billingInfo.name,
				adl1: this.props.user.billingInfo.address,
				adl2: this.props.user.billingInfo.address2,
				city: this.props.user.billingInfo.city,
				state: this.props.user.billingInfo.state,
				zip: this.props.user.billingInfo.zip
			}, () => {
				for(let ref in this.refs) {
					this.refs[ref].focus();
					this.refs[ref].blur();
				}
			});
		}
	}

	handleCardChange = (e) => this.setState({ card: e.target.value });

	handleMonthChange = (e) => this.setState({ month: e.target.value });

	handleYearChange = (e) => this.setState({ year: e.target.value });

	handleSecChange = (e) => this.setState({ sec: e.target.value });

	handleNameChange = (e) => this.setState({ name: e.target.value });

	handleAddressChange = (e) => this.setState({ adl1: e.target.value });

	handleAddress2Change = (e) => this.setState({ adl2: e.target.value });

	handleCityChange = (e) => this.setState({ city: e.target.value });

	handleStateChange = (e) => {
		e.persist();
		this.setState({ state: e.target.value }, this.props.autoCompleteState(e));
	}

	autoCompClick = (e) => {
		e.persist();
		const s = e.target.dataset.state.toLowerCase();
		this.setState({ state: toTitleCase(s) }, this.props.autoCompClick(e));
	}

	handleZipChange = (e) => this.setState({ zip: e.target.value });

	submitOrder = () => this.props.submitOrder(this.state);
	
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
							value={this.state.card}
							onChange={this.handleCardChange}
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
							value={this.state.month}
							onChange={this.handleMonthChange}
							ref="month"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="number"
							id="month" />
					</div>
					<div className="input year">
						<label htmlFor="year">Year</label>
						<input
							value={this.state.year}
							onChange={this.handleYearChange}
							ref="year"
							onFocus={this.props.handleFocus}
							onBlur={this.props.handleBlur} 
							type="number"
							id="year" />
					</div>
					<div className="input cv">
						<label htmlFor="cv">CVV</label>
						<input
							value={this.state.sec}
							onChange={this.handleSecChange}
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
								value={this.state.name}
								onChange={this.handleNameChange}
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
								value={this.state.adl1}
								onChange={this.handleAddressChange}
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
								value={this.state.adl2}
								onChange={this.handleAddress2Change}
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
								value={this.state.city}
								onChange={this.handleCityChange}
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
								value={this.state.state}
								onChange={this.handleStateChange}
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur}
								type="text" 
								id="bstate"
								ref="bstate" />
							<div className="autocomp">
								{
									this.props.statesComplete2.map((state, i) => {
										if(i < 4) return <div 
																				onClick={this.autoCompClick}
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
								value={this.state.zip}
								onChange={this.handleZipChange}
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