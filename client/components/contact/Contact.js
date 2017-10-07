import React, { Component } from 'react';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Contact Us:',
      classes: 'contact-page'
    }
  }

  componentDidMount(){
    console.log('mounted');
    setTimeout(() => {
      this.setState({ classes: "contact-page contact-page-show" });
    }, 500);
  }

  render = () => {
    let inc = 0;
		return(
      <div className={this.state.classes} id='contactUs'>
        <div id='headings'>
          <h2>Questions about our products?</h2>
          <h2>Want to put together a gift basket?</h2>
          <h2>Need some recipe ideas?</h2>
          <h1>
            {
              this.state.text.split('').map((letter, i) => {
                inc += 1
                if(letter === ' ') {
                  return <div 
                          key={i} 
                          style={{transitionDelay: (0.3 + (inc/50)) + 's'}}>&nbsp;</div>
                } else {
                  return <div 
                          key={i}
                          style={{transitionDelay: (0.3 + (inc/50)) + 's'}}>{letter}</div>
                }
              })
            }
          </h1>
        </div>
        <div id='cf'>
          <form>
            <input 
              type="text" 
              placeholder="Name" />
            <input 
              type="text"
              placeholder="Email" />
            <textarea 
              name="Message" 
              placeholder="Message"></textarea>
            <button></button>
          </form>
        </div>
      </div>
		);
	}
}