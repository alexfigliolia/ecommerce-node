import React, { Component } from 'react';
import Product from './Product';

class Shop extends Component {
  render() {
    return (
      <div>
          <div className='products shop-products'>
              <h2>Sauces & Veggies</h2>
              <div ref='carousel0' className='center pc' id='c1'>
                  {
                      this.props.svProducts.map((product, i) => {
                          return(
                              <Product 
                                  name={product.title}
                                  desc={product.description}
                                  ident={product.title}
                                  key={i}
                                  price={product.price.data.rounded.with_tax}
                                  image={product.images[0].url.https}
                                  more={this.props.more}
                                  add={this.props.add}
                                  pid={product.id}
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
                                name={product.title}
                                desc={product.description}
                                ident={product.title}
                                key={i}
                                price={product.price.data.rounded.with_tax}
                                image={product.images[0].url.https}
                                more={this.props.more}
                                add={this.props.add}
                                pid={product.id}
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
                                  name={product.title}
                                  desc={product.description}
                                  ident={product.title}
                                  key={i}
                                  price={product.price.data.rounded.with_tax}
                                  image={product.images[0].url.https}
                                  more={this.props.more}
                                  add={this.props.add}
                                  pid={product.id}
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

export default Shop;
