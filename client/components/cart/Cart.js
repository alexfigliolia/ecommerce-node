import React, {Component} from 'react';

export default class Cart extends Component {
	render = () => {
		return(
			<div id='shoppingCart' className={this.props.classes}>
        <div className='center'>
          <h1>My Cart</h1>
          <div id='table' className='table' onClick={this.props.removeItem}>
          	<h2 id='emptyCart' className={this.props.emptyCart}>Your cart is empty!</h2>
            { 
              this.props.products.map(function(product, i, props) {
              	return (
                  <div className="cart-item" key={i} data-index={i}>
                    <button className='remove-item' data-product={product[0]} data-price={product[1]} data-index={i} data-id={product[2]}></button>
                    <h3 className='item-name'>{product[0]}</h3>
                    <h3 className='cart-price'>${product[1]}</h3>
                  </div>
                );
              })
            }
          </div>
          <div id='total' className='total'>
          	<h3>Total: ${this.props.total}</h3>
          </div>
          <div id='bdogs' className='bdogs'>
            <button 
            	id='shopMore' 
            	onClick={this.props.cartToggle}></button>
            <button 
            	id='checkout'
            	data-page="Checkout"
            	onClick={this.props.nav}></button>
          </div>
        </div>
      </div>
		);
	}
}