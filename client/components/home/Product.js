import React, { Component } from 'react';
import Flickity from 'flickity';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      classes: 'product'
    }
  }

  componentDidMount(){  
    const carousel = document.getElementById('hc');
    const options = {
      contain: true,
      watchCSS: true,
      setGallerySize : true
    };
    this.flkty = new Flickity(carousel, options);
    this.flkty.on( 'select', () => {
      this.setState({ currentIndex: this.flkty.selectedIndex }, () => {
        if(this.flkty.selectedIndex === this.props.rf){
          this.setState({ classes: 'product product-show' });
        } else {
          this.setState({ classes: 'product' });
        }
      });
    });
    if(this.state.currentIndex === this.props.rf){
      this.setState({ classes: 'product product-show' });
    } else {
      this.setState({ classes: 'product' });
    }
  }

  componentWillUnmount() {
    if (this.flkty) this.flkty.destroy();
  }

  render = () => {
    return (
      <div 
        className={this.state.classes} 
        data-desc={this.props.desc} 
        key={this.props.ident}
        ref={this.props.rf}>
          <div className='p-img'>
            <img 
              onClick={this.props.more} 
              className='product-img' 
              src={this.props.image} 
              alt={this.props.name} />
            <h3>
              {
                this.props.name.split('').map((letter, i) => {
                  return <span
                           style={{transitionDelay: (i/20) + 's'}} 
                           key={i}>{letter}</span>
                })
              }
            </h3>
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
