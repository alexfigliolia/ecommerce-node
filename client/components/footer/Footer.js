import React, { Component } from 'react';

class Footer extends Component {
	render(){
		return(
			<footer>
                <div>
                    <h1 onClick={this.props.nav} className='router logo' data-page="Home">Italia Presents</h1>
                    <h2 onClick={this.props.nav} className='router' data-page="Shop">Shop
                    	<img src='cart3.svg' alt='to cart' />
                    </h2>
                    <h2 onClick={this.props.nav} className='router' data-page="Contact">Contact 
                    	<img src='0070-envelop.svg' alt='to contact' />
                    </h2>
                    <h2>Connect with Us 
                        <img src='0387-share2.svg' alt='connect with us' />
                    </h2>
                </div>
            </footer>
		);
	}
}

export default Footer;