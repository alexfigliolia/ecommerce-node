import React, { Component } from 'react';
import Flickity from 'flickity';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex0: 0,
      currentIndex1: 0,
      currentIndex2: 0,
      classes: 'product'
    }
  }

  componentDidMount = () => {
    const carousel0 = document.getElementById('c1');
    const carousel1 = document.getElementById('c2');
    const carousel2 = document.getElementById('c3');
    const options = {
      "contain": true,
      "watchCSS": true
    };

    this.flkty0 = new Flickity(carousel0, options);
    this.flkty1 = new Flickity(carousel1, options);
    this.flkty2 = new Flickity(carousel2, options);
    this.flkty0.on( 'select', () => {
      this.setState({ currentIndex0: this.flkty0.selectedIndex }, () => {
        if(this.flkty0.selectedIndex === this.props.rf){
          this.setState({ classes: 'product product-show' });
        } else {
          this.setState({ classes: 'product' });
        }
      });
    });
    this.flkty1.on( 'select', () => {
      this.setState({ currentIndex1: this.flkty1.selectedIndex }, () => {
        if(this.flkty1.selectedIndex === this.props.rf){
          this.setState({ classes: 'product product-show' });
        } else {
          this.setState({ classes: 'product' });
        }
      });
    });
    this.flkty2.on( 'select', () => {
      this.setState({ currentIndex2: this.flkty2.selectedIndex }, () => {
        if(this.flkty2.selectedIndex === this.props.rf){
          this.setState({ classes: 'product product-show' });
        } else {
          this.setState({ classes: 'product' });
        }
      });
    });
    setTimeout(() => {
      if(window.innerWidth >= 957) {
        this.setState({ classes: 'product product-show' });
      } else {
        if(this.state.currentIndex0 === this.props.rf ||
           this.state.currentIndex1 === this.props.rf ||
           this.state.currentIndex2 === this.props.rf){
          this.setState({ classes: 'product product-show' });
        } else {
          this.setState({ classes: 'product' });
        }
      }
    }, 1500);
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 957) {
        this.setState({ classes: 'product product-show' });
      }
    });
  }

  componentWillUnmount = () => {
    if (this.flkty0 || this.flkty1 || this.flkty2) {
      this.flkty0.destroy();
      this.flkty1.destroy();
      this.flkty2.destroy();
    }
    window.removeEventListener('resize', () => {});
  }

  render = () => {
    return (
      <div 
        className={this.state.classes} 
        data-desc={this.props.desc} 
        key={this.props.ident}
        style={{
          transitionDelay: this.props.delay !== undefined ? (0.7 + (this.props.delay/10)) + 's' : 'none'
        }}>
        <div className='p-img'>
          <img 
            className='product-img' 
            src={this.props.image} 
            alt={this.props.name}
            onClick={this.props.more} />
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

