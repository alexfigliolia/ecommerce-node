import React, { Component } from 'react';
import Product from './Product';

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: 'products shop-products',
      text1: 'Sauces & Veggies'
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ classes: "products shop-products shop-show" });
    }, 500);
  }

  render = () => {
    let inc = 0
    return (
      <div>
        <div className={this.state.classes}>
          <h2>
            {
              this.state.text1.split('').map((letter, i) => {
                  inc += 1
                return letter === ' ' ? 
                  <div 
                    key={i} 
                    style={{transitionDelay: inc/50 + 's'}}>&nbsp;</div> 
                : <div 
                    key={i}
                    style={{transitionDelay: inc/50 + 's'}}>{letter}</div>
              })
            }
          </h2>
          <div ref='carousel0' className='center pc' id='c1'>
            {
              this.props.svProducts.map((product, i) => {
                return(
                  <Product 
                    name={product.name}
                    desc={product.description}
                    ident={product.name}
                    key={i}
                    mathPrice={product.meta.display_price.with_tax.amount}
                    price={product.meta.display_price.with_tax.formatted}
                    image={product.image}
                    more={this.props.more}
                    add={this.props.add}
                    pid={product.id}
                    rf={i}
                    delay={i}
                  />
                );
              })
            }
          </div>
        </div>
        <div className='products shop-products'>
          <h2>Oil & Vinegar</h2>
          <div ref='carousel1' className='center pc' id='c2'>
            {
              this.props.ovProducts.map((product, i) => {
                return(
                  <Product 
                    name={product.name}
                    desc={product.description}
                    ident={product.name}
                    key={i}
                    mathPrice={product.meta.display_price.with_tax.amount}
                    price={product.meta.display_price.with_tax.formatted}
                    image={product.image}
                    more={this.props.more}
                    add={this.props.add}
                    pid={product.id}
                    rf={i}
                  />
                );
              })
            }
          </div>
        </div>
        <div  className='products shop-products'>
          <h2>Pasta & Biscotti</h2>
          <div ref='carousel2' className='center pc' id='c3'>
            {
              this.props.pbProducts.map((product, i) => {
                return(
                  <Product 
                    name={product.name}
                    desc={product.description}
                    ident={product.name}
                    key={i}
                    mathPrice={product.meta.display_price.with_tax.amount}
                    price={product.meta.display_price.with_tax.formatted}
                    image={product.image}
                    more={this.props.more}
                    add={this.props.add}
                    pid={product.id}
                    rf={i}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
