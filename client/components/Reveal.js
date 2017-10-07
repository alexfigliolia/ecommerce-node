import React, {Component} from 'react';

export default class Reveal extends Component {
	render(){
		return(
			<div 
				className={this.props.class} 
				id={this.props.id}>{this.props.text}</div>
		);
	}
}