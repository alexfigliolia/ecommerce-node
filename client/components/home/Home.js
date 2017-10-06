import React, { Component } from 'react';
import Banner from './Banner.js';
import About from './About.js';
import ProductsH from './ProductsH.js';
import Bigbutton from './Bigbutton.js';

class Home extends Component {
  render() {
    return (
      <div>
        <Banner 
          nav={this.props.nav}
          scrollTo={this.props.scrollTo} />

        <About 
          nav={this.props.nav} />

        <ProductsH 
          more={this.props.more} 
          add={this.props.add}
          products={this.props.products} />

        <Bigbutton 
          nav={this.props.nav} />
      </div>
    );
  }
}

export default Home;
