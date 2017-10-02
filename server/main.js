import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Moltin } from '@moltin/sdk';
import MoltinUtil from 'moltin-util';

const client = MoltinUtil({
	publicId: 'tnuN3Xzb6tnN7p5ZETF1M0Gtwba0AoSh2bWL63pI',
	secretKey: 'kuogugLCp03PotGr9UG3q9f7WwJuxteHhGdsAdk6'
});

const guestUser = {
  name: "",
  email: "",
  paymentInfo: {
    card: "",
    cvv: "",
    expiration: "",
  },
  billingInfo: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  },
  shippingInfo: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  }
}

Accounts.onCreateUser((options, user) => {
  user.name = options.name;
  user.paymentInfo = guestUser.paymentInfo;
  user.billingInfo = guestUser.billingInfo;
  user.shippingInfo = guestUser.shippingInfo;
  return user;
});

Meteor.methods({
	'products.get'(){
		return client.request(client.endpoints.PRODUCTS)
	  .then(resp => resp)
	  .catch(err => console.log('err', err));
	},

  'guest.setNameEmail'(name, email){
    check(name, String);
    check(email, String);
    guestUser.name = name;
    guestUser.email = email;
  },

  'guest.setShipping'(name, adl1, adl2, city, state, zip){
    check(name, String);
    check(adl1, String);
    check(adl2, String);
    check(city, String);
    check(state, String);
    check(zip, String);
    guestUser.shippingInfo = {
      name: name,
      address: adl1,
      address2: adl2,
      city: city, 
      state: state,
      zip: zip
    }
  },

  'guest.setPayBilling'(cr, month, year, sec, name=guestUser.shippingInfo.name, adl1=guestUser.shippingInfo.address, adl2=guestUser.shippingInfo.address2, city=guestUser.shippingInfo.city, state=guestUser.shippingInfo.state, zip=guestUser.shippingInfo.zip){
    check(cr, String);
    check(month, String);
    check(year, String);
    check(sec, String);
    check(name, String);
    check(adl1, String);
    check(adl2, String);
    check(city, String);
    check(state, String);
    check(zip, String);
    guestUser.paymentInfo = {
      card: cr,
      cvv: sec,
      expiration: month + '/' + year,
    }
    guestUser.billingInfo = {
      name: name,
      address: adl1,
      address2: adl2,
      city: city, 
      state: state,
      zip: zip
    }
  }
});


