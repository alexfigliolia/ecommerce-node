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
    expirationMonth: "",
    expirationYear: ""
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

Meteor.publish('userData', function() {
  let currentUser;
  currentUser = this.userId;
  if (currentUser) {
     return Meteor.users.find({
        _id: currentUser
     }
     ,{
       fields: {
          "name" : 1,
          "shippingInfo": 1,
          "billingInfo": 1,
          "paymentInfo": 1
       }
     });
  } else {
    return this.ready();
  }
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

  'user.setShipping'(name, adl1, adl2, city, state, zip) {
    check(name, String);
    check(adl1, String);
    check(adl2, String);
    check(city, String);
    check(state, String);
    check(zip, String);
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        shippingInfo: {
          name: name,
          address: adl1,
          address2: adl2,
          city: city, 
          state: state,
          zip: zip
        }
      }
    });
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
      expirationMonth: month,
      expirationYear: year
    }
    guestUser.billingInfo = {
      name: name,
      address: adl1,
      address2: adl2,
      city: city, 
      state: state,
      zip: zip
    }
  },

  'user.setPayBilling'(cr, month, year, sec, name=Meteor.user().shippingInfo.name, adl1=Meteor.user().shippingInfo.address, adl2=Meteor.user().shippingInfo.address2, city=Meteor.user().shippingInfo.city, state=Meteor.user().shippingInfo.state, zip=Meteor.user().shippingInfo.zip){
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
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        billingInfo: {
          name: name,
          address: adl1,
          address2: adl2,
          city: city, 
          state: state,
          zip: zip
        },
        paymentInfo: {
          card: cr,
          cvv: sec,
          expirationMonth: month,
          expirationYear: year
        }
      }
    });
  },

  'user.placeOrder'(){
    console.log('placed fake order!');
  }
});


