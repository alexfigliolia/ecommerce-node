import React, { Component } from 'react';
import Flickity from 'flickity';

class Product extends Component {
    componentDidMount() {
      const carousel0 = document.getElementById('c1'),
            carousel1 = document.getElementById('c2'),
            carousel2 = document.getElementById('c3'),
            options = {
                "contain": true,
                "watchCSS": true
            };

      this.flkty0 = new Flickity(carousel0, options);
      this.flkty1 = new Flickity(carousel1, options);
      this.flkty2 = new Flickity(carousel2, options);
  }
  componentWillUnmount() {
      if (this.flkty0 || this.flkty1 || this.flkty2) {
          this.flkty0.destroy();
          this.flkty1.destroy();
          this.flkty2.destroy();
      }
  }
  render() {
    return (
      <div className='product' data-desc={this.props.desc} key={this.props.ident}>
        <div className='p-img'>
          <img 
            className='product-img' 
            src={this.props.image} 
            alt={this.props.name}
            onClick={this.props.more} />

          <h3>{this.props.name}</h3>
        </div>
        <div className='p-buttons'>
          <button 
            className='more' 
            data-text="MORE" 
            onClick={this.props.more}>
          </button>
          <button 
            onClick={this.props.add} 
            className='buy' 
            data-product={this.props.name} 
            data-price={this.props.price} 
            data-id={this.props.pid} 
            data-text="BUY">
          </button>
        </div>
        <div className='price'>${this.props.price}</div>
      </div>
    );
  }
}

export default Product;
