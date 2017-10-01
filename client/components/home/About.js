import React, {Component} from 'react';

class About extends Component {
	render(){
		return(
            <div id='abt' className='intro'>
                <div>
                    <div className='img-container'>
                        <img src='bpizza1.jpg' alt="home-made pizza" />
                    </div>
                    <div className='text-container'>
                        <p>Grown by a small family in beautiful Italy, these foods are both an asset and staple in kitchens throughout the county. The Ciarlo family known for their farm to table foods as well as making them accessible to customers all over the country.</p>
                        <p>From blends of fresh veggies that can be used as appetizers or ingredients or fresh Bruschetta from cherry tomatos, each item is of the highest quality and convenient to use or snack on.</p>
                        <button className='router' data-page='Shop' onClick={this.props.nav}></button>
                    </div>
                </div>
            </div>
		);
	}
}

export default About;