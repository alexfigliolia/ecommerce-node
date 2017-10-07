import React from 'react';
// import { onPageLoad } from 'meteor/server-render'; 
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../startup/accounts-config.js';
import AppContainer from './Container.js';
 
Meteor.startup(() => {  
  render(<AppContainer />, document.getElementById('root'));
});

// onPageLoad(() => {  
//   render(<AppContainer />, document.getElementById('root'));
// });