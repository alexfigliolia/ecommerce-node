import React, { Component } from 'react';
import Burger from './Burger.js';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classes: "header"
		}
	}

	componentDidMount(){
    setTimeout(() => {
      this.setState({ classes: "header header-show" });
    }, 1000);
  }

	render = () => {
		return(
			<header
				className={this.state.classes}>
        <div 
          className='show-cart' 
          id='toCart' 
          onClick={this.props.cartToggle}>
          <div className={this.props.smallI}>{this.props.dot.length}</div>
        </div>
        <h1 
          className='logo router' 
          data-page='Home' 
          onClick={this.props.nav}>Italia Presents</h1>
        <Burger 
          classes={this.props.burgerStuff} 
          burger={this.props.burger} />
        <nav id='hLinks'>
          <h2 
          	className={this.props.page === "Home" ? 'router lHome hlink active' : 'router lHome hlink'} 
          	data-page="Home" 
          	onClick={this.props.nav}>HOME</h2>
          <h2 
          	className={this.props.page === "Shop" ? 'router lShop hlink active' : 'router lShop hlink'} 
          	data-page="Shop" 
          	onClick={this.props.nav}>SHOP</h2>
          <h2 
          	className={this.props.page === "Contact" ? 'router lContact hlink active' : 'router lContact hlink'} 
          	data-page="Contact" 
          	onClick={this.props.nav}>CONTACT</h2>
          <h2 className='show-cart' onClick={this.props.cartToggle}>
          	<img height="45px" src='cart3.svg' alt='to shopping cart' />
          	<div className={this.props.largeI}>{this.props.dot.length}</div>
          </h2>
        </nav>
      </header>
		);
	}
}