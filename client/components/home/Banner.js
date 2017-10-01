import React, {Component} from 'react';

class Banner extends Component {
    render(){
		return(
			<div className='banner' id='banner'>
                <div className='center'>
                    <h1>Farm to table food products</h1>
                    <div>
                        <button className='explore router' data-page='Shop' onClick={this.props.nav}></button>
                        <button id='toAbout' onClick={this.props.scrollTo}></button>
                    </div>
                </div>
                <button className="scroll" onClick={this.props.scrollTo}></button>
            </div>
		);
	}
}

export default Banner;