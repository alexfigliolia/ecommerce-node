import React, {Component} from 'react';

export default class Bigbutton extends Component {
	render = () => {
		return(
			<div id='seeAll'>
        <button 
        	className='router' 
        	data-page="Shop" 
        	onClick={this.props.nav}></button>
      </div>
		);
	}
}

