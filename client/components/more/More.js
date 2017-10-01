import React, {Component} from 'react';

class More extends Component {
	render(){
		return(
			<div className={this.props.classes} id='moreInfo'>
	            <div>
	                <div className='tb'>
	                    <h1 className='strike'>{this.props.name}</h1>
	                </div>
	                <div id='mImg' className='m-img'>
	                    <img src={this.props.img} alt='product'/>
	                </div>
	                <div className='moreP'>
	                     <p>{this.props.description}</p>
	                     <div>
	                         <button id='mib' className="buy" data-product={this.props.name} data-price={this.props.price} onClick={this.props.add}></button>
	                     </div>
	                </div>
	                <div id='forSpace'></div>
	            </div>
	        </div>
		);
	}
}

export default More