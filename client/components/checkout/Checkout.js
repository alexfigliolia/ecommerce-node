import React, { Component } from 'react';
import Login from './login/Login';
import GuestCheckout from './guestCheckout/GuestCheckout';
import ShippingInfo from './shippingInfo/ShippingInfo';
import BillingInfo from './billingInfo/BillingInfo';
import OrderSubmitted from './orderSubmitted/OrderSubmitted';
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
			submittingOrder: false,
			updatingInfo: false
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
        this.setState({ height: (window.innerHeight - 250) + "px" });              
      }, 250);
		});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps !== this.props && nextProps.user === null){
			this.setState({
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
				submittingOrder: false,
				updatingInfo: false
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', (e) => {
			clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.setState({ height: (window.innerHeight - 250) + "px" });              
      }, 250);
		});
	}

	handleFocus = (e) => { e.target.parentNode.classList.add('focus') }

	handleBlur = (e) => {
		if(e.target.value === "") e.target.parentNode.classList.remove('focus');
	}

	handleLogin = (e, p) => {
		const ev = this.reg.test(e);
		if(ev && p.length > 3) this.props.login(e, p);
		!ev ? this.setState({loginEValidated: false}) : this.setState({loginEValidated: true});
		p.length < 4 ? this.setState({loginPValidated: false}): this.setState({loginPValidated: true});
	}

	handleWantsGuest = (context) => {
		const n = context.name.value;
		const e = context.email.value;
		const ev = this.reg.test(e);
		if(ev && n.length >= 4) {
			Meteor.call('guest.setNameEmail', n, e, (error, result) => {
				if(error) {
					console.log(error);
				} else {
					this.setState({ wantsGuest: true },
						scrollIt( 0, 300, 'easeOutQuad' ));
					this.email = e;
					this.name = n;
				}
			});
		}
		n.length < 4 ? this.setState({guestNValidated: false}) : this.setState({guestNValidated: true});
		!ev ? this.setState({guestEValidated: false}): this.setState({guestEValidated: true});
	}

	toBilling = (context) => {
		const zipReg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		const zipGood = zipReg.test(context.zip);
		if(context.name.length > 2 && context.adl1.length > 3 && context.city.length > 2 && context.state.length > 1 && zipGood) {
			if(this.props.loggedIn) {
				Meteor.call('user.setShipping', context.name, context.adl1, context.adl2, context.city, context.state, context.zip, (error, result) => {
					if(error) { console.log(error); } else { this.setShippingCallBack(); }
				});
			} else {
				Meteor.call('guest.setShipping', context.name, context.adl1, context.adl2, context.city, context.state, context.zip, (error, result) => {
					if(error) { console.log(error); } else { this.setShippingCallBack(); }
				});
			}
		} else {
			this.setState({ shippingValidated: false }, 
				scrollIt( 0, 300, 'easeOutQuad' ));
		}
	}

	autoCompleteState = (e) => {
		const input = e.target.value;
    const string = input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let matches = [];
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
		e.target.parentNode.previousSibling.value = toTitleCase(s);
		if(e.target.parentNode.previousSibling.id === 'sstate') {
			this.setState({ statesComplete: [] });
		} else {
			this.setState({ statesComplete2: [] });
		}
	}

	submitOrder = (context) => {
		this.setState({ buttonClasses: "button button-loads" });
		if(!this.state.sameAsShipping) {
			const zipReg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
			const zipGood = zipReg.test(context.zip);
			if(!isNaN(context.card) && !isNaN(context.month) && !isNaN(context.year) && !isNaN(context.sec) && context.name.length > 2 && context.adl1.length > 3 && context.city.length > 2 && context.state.length > 1 && zipGood) {
				if(this.props.loggedIn) {
					Meteor.call('user.setPayBilling', context.card, context.month, context.year, context.sec, context.name, context.adl1, context.adl2, context.city, context.state, context.zip, (error, result) => {
						if(error) { console.log(error); } else { this.onSubmit(); }
					});
				} else {
					Meteor.call('guest.setPayBilling', context.card, context.month, context.year, context.sec, context.name, context.adl1, context.adl2, context.city, context.state, context.zip, (error, result) => {
						if(error) { console.log(error); } else { this.onSubmit(); }
					});
				}
			} else {
				this.setState({ billingValidated: false, buttonClasses: "button"
				}, scrollIt( (document.getElementById('bitle').offsetTop - 80), 300, 'easeOutQuad' ));
			}
		} else {
			if(context.card !== '' && context.month !== '' && context.year !== '' && context.sec !== '') {
				if(this.props.loggedIn) {
					Meteor.call('user.setPayBilling', context.card, context.month, context.year, context.sec, (error, result) => {
						if(error) { console.log(error); } else { this.onSubmit(); }
					});
				} else {
					Meteor.call('guest.setPayBilling', context.card, context.month, context.year, context.sec, (error, result) => {
						if(error) { console.log(error); } else { this.onSubmit(); }
					});
				}
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
		Meteor.call('user.placeOrder', (error, result) => {
			this.setState({ orderSubmitted: true });
		});
	}

	noBilling = () => {
		this.setState({ sameAsShipping: !this.state.sameAsShipping });
	}

	onSubmit = () => {
		setTimeout(() => {
			this.setState({
				billingValidated: true,
				submittingOrder: true,
				buttonClasses: "button button-loads button-good",
			});
		}, 1000);
		setTimeout(() => { this.setState({ buttonClasses: "button" }) }, 2000);
		setTimeout(() => { this.setState({ orderSubmitted: true },
			scrollIt( 0, 300, 'easeOutQuad' )) }, 2500);
	}

	signUp = (e, context) => {
		e.persist();
		if(context.passcode.value !== "") {
			this.props.signUp(this.name, this.email, context.passcode.value);
			this.props.nav(e);
		}
	}

	displayUpdateInfo = () => { 
		this.setState({ updatingInfo: true }, () => {
			setTimeout(() => {
				scrollIt(0, 300, 'easeOutQuad');
			}, 500)
		}) 
	}

	setShippingCallBack = () => {
		this.setState({ displayBilling: true, shippingValidated: true }, () => {
			setTimeout(() => {
				scrollIt( (document.getElementById('bitle').offsetTop - 80), 300, 'easeOutQuad' );
			}, 200);
		});
	}

	render = () => {
		return (
			<section className="checkout" style={{minHeight: this.state.height}}>
				{
					!this.props.loggedIn &&
					<div style={{display: (this.state.orderSubmitted) ? "none" : "flex"}}>
						{
							!this.state.wantsGuest &&
							<Login 
								loginEValidated={this.state.loginEValidated}
								loginPValidated={this.state.loginPValidated}
								loginErrors={this.props.loginErrors}
								handleFocus={this.handleFocus}
								handleBlur={this.handleBlur}
								handleLogin={this.handleLogin} />
						}
						{
							!this.state.wantsGuest &&
							<GuestCheckout
								guestNValidated={this.state.guestNValidated}
								guestEValidated={this.state.guestEValidated}
								handleFocus={this.handleFocus}
								handleBlur={this.handleBlur}
								handleWantsGuest={this.handleWantsGuest} />
						}
						{
							this.state.wantsGuest &&
							<ShippingInfo
								shippingValidated={this.state.shippingValidated}
								guestNValidated={this.state.guestNValidated}
								guestEValidated={this.state.guestEValidated}
								wantsGuest={this.state.wantsGuest}
								statesComplete={this.state.statesComplete}
								updatingInfo={this.state.updatingInfo}
								handleFocus={this.handleFocus}
								handleBlur={this.handleBlur}
								autoCompleteState={this.autoCompleteState}
								handleWantsGuest={this.handleWantsGuest}
								toBilling={this.toBilling}
								autoCompClick={this.autoCompClick}
								loggedIn={this.props.loggedIn} />
						}
						{
							this.state.displayBilling &&
							<BillingInfo
								billingValidated={this.state.billingValidated}
								sameAsShipping={this.state.sameAsShipping}
								buttonClasses={this.state.buttonClasses}
								statesComplete2={this.state.statesComplete2}
								handleFocus={this.handleFocus}
								handleBlur={this.handleBlur}
								autoCompleteState={this.autoCompleteState}
								autoCompClick={this.autoCompClick}
								submitOrder={this.submitOrder}
								noBilling={this.noBilling}
								loggedIn={this.props.loggedIn} />
						}
					</div>
				}
				{
					this.state.orderSubmitted && 
						<OrderSubmitted 
							loggedIn={this.props.loggedIn}
							handleFocus={this.handleFocus}
							handleBlur={this.handleBlur}
							nav={this.props.nav}
							signUp={this.signUp} />
				}
				{
					this.props.loggedIn &&
					this.state.updatingInfo && 
					!this.state.orderSubmitted &&
						<div>
							<ShippingInfo 
								user={this.props.user}
								loggedIn={this.props.loggedIn}
								shippingValidated={this.state.shippingValidated}
								guestNValidated={this.state.guestNValidated}
								guestEValidated={this.state.guestEValidated}
								wantsGuest={this.state.wantsGuest}
								statesComplete={this.state.statesComplete}
								updatingInfo={this.state.updatingInfo}
								handleFocus={this.handleFocus}
								handleBlur={this.handleBlur}
								autoCompleteState={this.autoCompleteState}
								handleWantsGuest={this.handleWantsGuest}
								toBilling={this.toBilling}
								autoCompClick={this.autoCompClick} />

							{
								this.state.displayBilling &&
								<BillingInfo
									user={this.props.user}
									loggedIn={this.props.loggedIn}
									billingValidated={this.state.billingValidated}
									sameAsShipping={this.state.sameAsShipping}
									buttonClasses={this.state.buttonClasses}
									statesComplete2={this.state.statesComplete2}
									handleFocus={this.handleFocus}
									handleBlur={this.handleBlur}
									autoCompleteState={this.autoCompleteState}
									autoCompClick={this.autoCompClick}
									submitOrder={this.submitOrder}
									noBilling={this.noBilling} />
							}
						</div>	
				}
				{
					this.props.loggedIn &&
					!this.state.updatingInfo &&
					!this.state.orderSubmitted &&
					!this.state.submittingOrder && 
					<div className="logged-in-checkout">
						<div>
							<h2>Hello again!</h2>
							<div>
								<p>Would you like to submit your order with the info you have on file?</p>
								<div>User's saved shipping address</div>
								<button onClick={this.displayUpdateInfo}>Change Info</button>
								<button onClick={this.orderWithSavedInfo}>Submit Order</button>
							</div>
						</div>
					</div>
				}
			</section>
		);
	}
}