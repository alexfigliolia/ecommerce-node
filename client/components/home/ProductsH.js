import React, {Component} from 'react';
import Product from './Product';

class ProductsH extends Component {
	render = () => {
	  return(
      <div className='products'>
        <h2 className='strike'>Best Sellers</h2>
        <div  ref='carousel' className='center pc' id='hc'>
          {
            this.props.products.map((product, i) => {
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

export default ProductsH;

