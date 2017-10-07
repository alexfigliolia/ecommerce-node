import React, {Component} from 'react';

export default class Moreback extends Component {
	render = () => {
		return(
			<button 
				className={this.props.classes} 
				onClick={this.props.toggleMore}></button>
		);
	}
}