import React, { Component } from 'react';
import Flickity from 'flickity';

class Product extends Component {
  componentDidMount(){
      const carousel = document.getElementById('hc'),
            options = {
                  contain: true,
                  watchCSS: true,
                  setGallerySize : true
            };

      this.flkty = new Flickity(carousel, options);
  }
  componentWillUnmount() {
      if (this.flkty) {
          this.flkty.destroy();
      }
  }
  render() {
    return (
      <div 
        className='product' 
        data-desc={this.props.desc} 
        key={this.props.ident}>
          <div className='p-img'>
              <img 
                  onClick={this.props.more} 
                  className='product-img' 
                  src={this.props.image} 
                  alt={this.props.name} />

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
