import React, {Component} from 'react';

class Bigbutton extends Component {
	render(){
		return(
			<div id='seeAll'>
                <button className='router' data-page="Shop" onClick={this.props.nav}></button>
            </div>
		);
	}
}

export default Bigbutton

