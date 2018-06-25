import React, {Component} from 'react';
import Product from './Product';

export default class ProductsH extends Component {
	render = () => {
	  return(
      <div className='products'>
        <h2 className='strike'>Best Sellers</h2>
        <div 
          ref='carousel' 
          className='center pc' 
          id='hc'>
          {
            this.props.products.map((product, i) => {
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
		);
	}
}

