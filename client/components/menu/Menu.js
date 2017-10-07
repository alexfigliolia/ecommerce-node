import React, {Component} from 'react';

export default class Menu extends Component {
	render = () => {
		return(
			<div className={this.props.classes}>
        <div className='m1'></div>
        <div className='m2'></div>
        <div className='mmLinks'>
          <h2 
          	className={this.props.page === "Home" ? 'mmHome mm active' : 'mmHome mm'} 
          	data-page="Home" 
          	onClick={this.props.nav}>Home</h2>
          <h2 
          	className={this.props.page === "Shop" ? 'mmShop mm active' : 'mmShop mm'} 
          	data-page="Shop" 
          	onClick={this.props.nav}>Shop</h2>
          <h2 
          	className={this.props.page === "Contact" ? 'mmContact mm active' : 'mmContact mm'} 
          	data-page="Contact" 
          	onClick={this.props.nav}>Contact</h2>
          <h2 
          	className='mmCart mm' 
          	onClick={this.props.toCart}>Cart</h2>
        </div>
    	</div>
		);
	}
}