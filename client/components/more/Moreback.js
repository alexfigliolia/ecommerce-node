import React, {Component} from 'react';

class Moreback extends Component {
	render(){
		return(
			<button className={this.props.classes} onClick={this.props.toggleMore}></button>
		);
	}
}

export default Moreback