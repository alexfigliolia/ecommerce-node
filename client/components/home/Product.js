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
    if(window.innerWidth >= 957) {
      this.setState({ classes: 'product product-show' });
    } else {
      if(this.state.currentIndex === this.props.rf){
        this.setState({ classes: 'product product-show' });
      } else {
        this.setState({ classes: 'product' });
      }
    }
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 957) {
        this.setState({ classes: 'product product-show' });
      }
    });
  }

  componentWillUnmount() {
    if (this.flkty) this.flkty.destroy();
    window.removeEventListener('resize', () => {});
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
                  if(letter === ' ') {
                    return <span
                           style={{transitionDelay: (i/50) + 's'}} 
                           key={i}>&nbsp;</span>
                  } else {
                    return <span
                           style={{transitionDelay: (i/50) + 's'}} 
                           key={i}>{letter}</span>
                  }
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
              data-price={this.props.mathPrice.toString().slice(0, -2)}
              data-id={this.props.pid} 
              data-text="BUY">
            </button>
          </div>
          <div className='price'>{this.props.price.slice(0, -3)}</div>
      </div>
    );
  }
}
