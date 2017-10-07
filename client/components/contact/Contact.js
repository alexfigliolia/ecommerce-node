import React, { Component } from 'react';

class Contact extends Component {
  render = () => {
    let inc = 0;
		return(
      <div id='contactUs'>
        <div id='headings'>
          <h2>Questions about our products?</h2>
          <h2>Want to put together a gift basket?</h2>
          <h2>Need some recipe ideas?</h2>
          <h1 className='strike'>Contact Us:</h1>
        </div>
        <div id='cf'>
          <form>
            <input placeholder="Name" />
            <input placeholder="Email" />
            <textarea name="Message" placeholder="Message"></textarea>
            <button></button>
          </form>
        </div>
      </div>
		);
	}
}

export default Contact;