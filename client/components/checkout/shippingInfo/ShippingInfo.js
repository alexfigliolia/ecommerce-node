import React, { Component } from 'react';
import { toTitleCase } from '../../../../helpers/helpers';

export default class ShippingInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			adl1: '',
			adl2: '',
			city: '',
			state: '',
			zip: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.loggedIn !== nextProps.loggedIn) {
			this.setState({
				name: nextProps.loggedIn ? nextProps.user.shippingInfo.name : '',
				adl1: nextProps.loggedIn ? nextProps.user.shippingInfo.address : '',
				adl2: nextProps.loggedIn ? nextProps.user.shippingInfo.address2 : '',
				city: nextProps.loggedIn ? nextProps.user.shippingInfo.city : '',
				state: nextProps.loggedIn ? nextProps.user.shippingInfo.state : '',
				zip: nextProps.loggedIn ? nextProps.user.shippingInfo.zip : ''
			});
		}
	}

	componentDidMount() {
		if(this.props.loggedIn) {
			this.setState({
				name: this.props.user.shippingInfo.name,
				adl1: this.props.user.shippingInfo.address,
				adl2: this.props.user.shippingInfo.address2,
				city: this.props.user.shippingInfo.city,
				state: this.props.user.shippingInfo.state,
				zip: this.props.user.shippingInfo.zip
			}, () => {
				for(let ref in this.refs) {
					this.refs[ref].focus();
					this.refs[ref].blur();
				}
			});
		}
	}

	toBilling = () => this.props.toBilling(this.state);

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
								onChange={this.handleNameChange} 
								type="text" 
								id="sname"
								ref="sname"
								value={this.state.name} />
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
								onChange={this.handleAddressChange} 
								type="text" 
								id="adl1"
								ref="adl1"
								value={this.state.adl1} />
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
								onChange={this.handleAddress2Change} 
								type="text" 
								id="adl2"
								ref="adl2"
								value={this.state.adl2} />
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
								onChange={this.handleCityChange} 
								type="text" 
								id="scity"
								ref="scity"
								value={this.state.city} />
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
								onChange={this.handleStateChange}
								type="text" 
								id="sstate"
								ref="sstate"
								value={this.state.state} />
							<div className="autocomp">
								{
									this.props.statesComplete.map((state, i) => {
										if(i < 4) return <div 
																				onClick={this.autoCompClick}
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
								onChange={this.handleZipChange}
								maxLength="5" 
								type="number" 
								id="szip"
								ref="szip"
								value={this.state.zip} />
						</div>
						: ""
					}
					<button onClick={this.toBilling}>Next</button>
				</div>
			</div>
		);
	}
}