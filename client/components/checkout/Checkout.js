import React, { Component } from 'react';
import ShippingInfo from './ShippingInfo';
import { scrollIt, toTitleCase } from '../../../helpers/helpers';

export default class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: (window.innerHeight - 250) + "px",
			wantsGuest: false,
			statesComplete: [],
			statesComplete2: [],
			displayBilling: false,
			shippingValidated: true,
			billingValidated: true,
			buttonClasses: "button",
			orderSubmitted: false,
			sameAsShipping: false,
			loginEValidated: true,
			loginPValidated: true,
			guestNValidated: true,
			guestEValidated: true,
		}
		this.states = [ 'ALABAMA', 'ALASKA', 'AMERICAN SAMOA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT', 'DELAWARE', 'DISTRICT OF COLUMBIA', 'FEDERATED STATES OF MICRONESIA', 'FLORIDA', 'GEORGIA', 'GUAM', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA', 'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARSHALL ISLANDS', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW HAMPSHIRE', 'NEW JERSEY', 'NEW MEXICO', 'NEW YORK', 'NORTH CAROLINA', 'NORTH DAKOTA', 'NORTHERN MARIANA ISLANDS', 'OHIO', 'OKLAHOMA', 'OREGON', 'PALAU', 'PENNSYLVANIA', 'PUERTO RICO', 'RHODE ISLAND', 'SOUTH CAROLINA', 'SOUTH DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGIN ISLANDS', 'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA', 'WISCONSIN', 'WYOMING'];
		this.email = '';
		this.name = '';
		this.reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	}

	componentDidMount(){
		let resizeTimer;
		window.addEventListener('resize', (e) => {
			clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.setState({
          height: (window.innerHeight - 250) + "px"
        });              
      }, 250);
		})
	}

	handleFocus = (e) => {
		e.target.parentNode.classList.add('focus');
	}

	handleBlur = (e) => {
		if(e.target.value === "") {
			e.target.parentNode.classList.remove('focus');
		}
	}

	handleLogin = () => {
		const e = this.refs.em.value;
		const pw = this.refs.pw.value;
		let ev = this.reg.test(e);
		if(ev && pw.length > 3) this.props.login(this.refs.em.value, this.refs.pw.value);
		!ev ? this.setState({loginEValidated: false}) : this.setState({loginEValidated: true});
		pw.length < 4 ? this.setState({loginPValidated: false}): this.setState({loginPValidated: true});
	}

	handleWantsGuest = (n, e) => {
		let ev = this.reg.test(e);
		if(ev && n.length >= 4) {
			Meteor.call('guest.setNameEmail', n, e, (error, result) => {
				if(error) {
					console.log(error);
				} else {
					this.setState({
						wantsGuest: true
					});
					scrollIt( 0, 300, 'easeOutQuad' );
					this.email = e;
					this.name = n;
				}
			});
		}
		n.length < 4 ? this.setState({guestNValidated: false}) : this.setState({guestNValidated: true});
		!ev ? this.setState({guestEValidated: false}): this.setState({guestEValidated: true});
	}

	toBilling = (context) => {
		const name = context.sname.value.replace(/[^a-zA-Z ]/g, ""),
					adl1 = context.adl1.value.replace(/[^a-zA-Z ]/g, ""),
					adl2 = context.adl2.value.replace(/[^a-zA-Z ]/g, ""),
					city = context.scity.value.replace(/[^a-zA-Z ]/g, ""),
					state = context.sstate.value.replace(/[^a-zA-Z ]/g, ""),
					zip = context.szip.value;
					zipReg = /(^\d{5}$)|(^\d{5}-\d{4}$)/,
					zipGood = zipReg.test(zip);
		if(!zipGood) {
			context.szip.value = "";
		}
		if(name.length > 2 && adl1.length > 3 && city.length > 2 && state.length > 1 && zipGood) {
			Meteor.call('guest.setShipping', name, adl1, adl2, city, state, zip, (error, result) => {
				this.setState({
					displayBilling: true,
					shippingValidated: true
				});
				setTimeout(() => {
					scrollIt( (document.getElementById('bitle').offsetTop - 80), 300, 'easeOutQuad' );
				}, 200);
			});
		} else {
			this.setState({
				shippingValidated: false
			}, scrollIt( 0, 300, 'easeOutQuad' ));
		}
	}

	autoCompleteState = (e) => {
		const input = e.target.id === "sstate" ? e.target.value : this.refs.bstate.value;
    let string = input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
        matches = [];
    if(string !== '') {
    	for(let i = 0; i < this.states.length; i++) {
        let s = this.states[i];
        if(s.toLowerCase().indexOf(string.toLowerCase()) === 0) {
          matches.unshift(s);
        } 
        if(s.toLowerCase().indexOf(string.toLowerCase()) !== 0 && s.toLowerCase().indexOf(string.toLowerCase()) !== -1) {
          matches.push(s);
        }
      }
      if(e.target.id === "sstate") {
      	this.setState({ statesComplete: matches });
      } else {
      	this.setState({ statesComplete2: matches });
      }
    } else {
      if(e.target.id === "sstate") {
      	this.setState({ statesComplete: [] });
      } else {
      	this.setState({ statesComplete2: [] });
      }
    }
	}

	autoCompClick = (e) => {
		let s = e.target.dataset.state.toLowerCase();
		if(e.target.parentNode.previousSibling.id === 'sstate') {
			e.target.parentNode.previousSibling.value = toTitleCase(s);
			this.setState({
				statesComplete: []
			});
		} else {
			this.refs.bstate.value = toTitleCase(s);
			this.setState({
				statesComplete2: []
			});
		}
	}

	submitOrder = () => {
		this.setState({
			buttonClasses: "button button-loads"
		});
		let number = this.refs.cr.value,
				month = this.refs.month.value,
				year = this.refs.year.value,
				sec = this.refs.cv.value;
		if(!this.state.sameAsShipping) {
			let name = this.refs.bname.value.replace(/[^a-zA-Z ]/g, ""),
					adl1 = this.refs.badl1.value.replace(/[^a-zA-Z ]/g, ""),
					adl2 = this.refs.badl2.value.replace(/[^a-zA-Z ]/g, ""),
					city = this.refs.bcity.value.replace(/[^a-zA-Z ]/g, ""),
					state = this.refs.bstate.value.replace(/[^a-zA-Z ]/g, ""),
					zip = this.refs.bzip.value;
					zipReg = /(^\d{5}$)|(^\d{5}-\d{4}$)/,
					zipGood = zipReg.test(zip);
			if(!zipGood) {
				this.refs.bzip.value = "";
			}
			if(!isNaN(number) && !isNaN(month) && !isNaN(year) && !isNaN(sec) && name.length > 2 && adl1.length > 3 && city.length > 2 && state.length > 1 && zipGood) {
				Meteor.call('guest.setPayBilling', number, month, year, sec, name, adl1, adl2, city, state, zip, (error, result) => {
					this.onSubmit();
				});
			} else {
				this.setState({
					billingValidated: false,
					buttonClasses: "button"
				}, scrollIt( (document.getElementById('bitle').offsetTop - 80), 300, 'easeOutQuad' ));
			}
		} else {
			if(number !== '' && month !== '' && year !== '' && sec !== '') {
				Meteor.call('guest.setPayBilling', number, month, year, sec, (error, result) => {
					this.onSubmit();
				});
			} else {
				this.setState({
					billingValidated: false,
					buttonClasses: "button"
				}, scrollIt( (document.getElementById('bitle').offsetTop - 80), 300, 'easeOutQuad' ));
			}
		}
	}

	orderWithSavedInfo = () => {
		//Place order with user object info
	}

	noBilling = () => {
		this.setState({
			sameAsShipping: !this.state.sameAsShipping
		})
	}

	onSubmit = () => {
		setTimeout(() => {
			this.setState({
				billingValidated: true,
				submittingOrder: true,
				buttonClasses: "button button-loads button-good"
			});
		}, 1000);
		setTimeout(() => {
			this.setState({
				buttonClasses: "button"
			});
		}, 3000);
		setTimeout(() => {
			this.setState({
				orderSubmitted: true
			});
		}, 3500);
	}

	signUp = (e) => {
		e.persist();
		if(this.refs.passcode.value !== "") {
			this.props.signUp(this.name, this.email, this.refs.passcode.value);
			this.props.nav(e);
		}
	}

	render = () => {
		return (
			<section className="checkout" style={{minHeight: this.state.height}}>
				{
					!this.props.loggedIn &&
					<div style={{display: (this.state.orderSubmitted) ? "none" : "flex"}}>
						{
							!this.state.wantsGuest &&
							<div className="login">
								<h2>Login</h2>
								<div>
									{
										!this.state.loginEValidated &&
										<h3>Please enter a valid email</h3>
									}
									{
										!this.state.loginPValidated &&
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
											onFocus={this.handleFocus}
											onBlur={this.handleBlur} 
											type="email" 
											id="em" />
									</div>
									<div className="input">
										<label htmlFor="pw">Password</label>
										<input
											ref="pw"
											onFocus={this.handleFocus}
											onBlur={this.handleBlur} 
											type="password" 
											id="pw" />
									</div>
									<button onClick={this.handleLogin}>Login</button>
								</div>
							</div>
						}
						<ShippingInfo 
							shippingValidated={this.state.shippingValidated}
							guestNValidated={this.state.guestNValidated}
							guestEValidated={this.state.guestEValidated}
							wantsGuest={this.state.wantsGuest}
							statesComplete={this.state.statesComplete}
							handleFocus={this.handleFocus}
							handleBlur={this.handleBlur}
							autoCompleteState={this.autoCompleteState}
							handleWantsGuest={this.handleWantsGuest}
							toBilling={this.toBilling}
							autoCompClick={this.autoCompClick} />
						{
							this.state.displayBilling &&
							<div className="billing">
								<h2 id="bitle">Billing Info:</h2>
								<div>
								  {
								  	!this.state.billingValidated &&
								  	<h3>*Please check your inputs!</h3>
								  }
									<h3>Card Number</h3>
									<div className="input">
										<label htmlFor="cr">Credit/Debit</label>
										<input
											ref="cr"
											onFocus={this.handleFocus}
											onBlur={this.handleBlur} 
											type="number" 
											id="cr" />
									</div>
									<h3>Expiration & Security</h3>
									<div className="input month">
										<label htmlFor="month">Month</label>
										<input
											ref="month"
											onFocus={this.handleFocus}
											onBlur={this.handleBlur} 
											type="number" 
											id="month" />
									</div>
									<div className="input year">
										<label htmlFor="year">Year</label>
										<input
											ref="year"
											onFocus={this.handleFocus}
											onBlur={this.handleBlur} 
											type="number" 
											id="year" />
									</div>
									<div className="input cv">
										<label htmlFor="cv">CVV</label>
										<input
											ref="cv"
											onFocus={this.handleFocus}
											onBlur={this.handleBlur} 
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
												checked={this.state.sameAsShipping}
												onChange={this.noBilling} />
											<label>No</label>
											<input 
												type="checkbox" 
												checked={!this.state.sameAsShipping}
												onChange={this.noBilling} />
										</div>
									</div>
									{
										!this.state.sameAsShipping &&
										<div className="input">
											<label htmlFor="bname">Name</label>
											<input
												onFocus={this.handleFocus}
												onBlur={this.handleBlur} 
												type="text" 
												id="bname"
												ref="bname" />
										</div>
									}
									{
										!this.state.sameAsShipping &&
										<div className="input">
											<label htmlFor="badl1">Address line 1</label>
											<input
												onFocus={this.handleFocus}
												onBlur={this.handleBlur} 
												type="text" 
												id="badl1"
												ref="badl1" />
										</div>
									}
									{
										!this.state.sameAsShipping &&
										<div className="input">
											<label htmlFor="badl2">Address line 2</label>
											<input
												onFocus={this.handleFocus}
												onBlur={this.handleBlur} 
												type="text" 
												id="badl2"
												ref="badl2" />
										</div>
									}
									{
										!this.state.sameAsShipping &&
										<div className="input">
											<label htmlFor="bcity">City</label>
											<input
												onFocus={this.handleFocus}
												onBlur={this.handleBlur} 
												type="text" 
												id="bcity"
												ref="bcity" />
										</div>
									}
									{
										!this.state.sameAsShipping &&
										<div className="input state">
											<label htmlFor="bstate">State</label>
											<input
												onFocus={this.handleFocus}
												onBlur={this.handleBlur}
												onChange={this.autoCompleteState}
												type="text" 
												id="bstate"
												ref="bstate" />
											<div className="autocomp">
												{
													this.state.statesComplete2.map((state, i) => {
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
										!this.state.sameAsShipping &&
										<div className="input zip">
											<label htmlFor="bzip">Zipcode</label>
											<input
												onFocus={this.handleFocus}
												onBlur={this.handleBlur}
												maxLength="5" 
												type="number" 
												id="bzip"
												ref="bzip" />
										</div>
									}
									<button 
										className={this.state.buttonClasses}
										onClick={this.submitOrder}>Submit Order</button>
								</div>
							</div>
						}
					</div>
				}
				{
					this.props.loggedIn && 
					<div className="logged-in-checkout">
						<div>
							<h2>Hello again!</h2>
							<div>
								<p>Would you like to submit your order with the info you have on file?</p>
								<div>User's saved shipping address</div>
								<button>Change Info</button>
								<button onClick={this.orderWithSavedInfo}>Submit Order</button>
							</div>
						</div>
					</div>
				}
				{
					(this.state.orderSubmitted && this.state.wantsGuest) ?
						<div className="congrats">
							<div>
								<h2>Congrats!</h2>
								<p>We have received your order! You will receive email confirmation from us shortly</p>
								<p>In the meantime you may return home or enter a password below for a speedy checkout experence in the future</p>
								<div>
									<label htmlFor="pwc">Password</label>
									<input 
										onFocus={this.handleFocus}
										onBlur={this.handleBlur}
										id="pwc" 
										ref="passcode"
										type="password" />
								</div>
								<button 
									onClick={this.props.nav}
									data-page="Home">Go Home</button>
								<button
									data-page="Home" 
									onClick={this.signUp}>Sign Up</button>
							</div>
						</div>
					: 
					""
				}
			</section>
		);
	}
}