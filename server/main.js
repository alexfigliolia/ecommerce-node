import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { Carts } from '../api/carts.js';
import { Orders } from '../api/orders.js';
import { check } from 'meteor/check';
import { Moltin } from '@moltin/sdk';
import MoltinUtil from 'moltin-util';
// import stripePackage from 'stripe';
// import { StripeSettings } from '../settings.js';

// const stripe = stripePackage(StripeSettings.private.stripe.testSecretKey);

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

Meteor.publish('carts', function() {
  let currentUser;
  currentUser = this.userId;
  if (currentUser) {
     return Carts.find({
        owner: currentUser
     }
     ,{
       fields: {
          "products": 1,
          "total" : 1
       }
     });
  } else {
    return this.ready();
  }
});

Meteor.methods({
	'products.get'(){
		return client.request(client.endpoints.PRODUCTS)
	  .then(resp => {
      console.log(resp);
      return resp;
    })
	  .catch(err => console.log('err', err));
	},

  'guest.setNameEmail'(name, email){
    check(name, String);
    check(email, String);
    guestUser.name = name;
    guestUser.email = email;
  },

  'user.createCart'(){
    return Carts.insert({owner: Meteor.userId(), products: []});
  },

  'cart.clear'(){
    return Carts.update({owner: Meteor.userId()}, {
      $set: {
        products: []
      }
    });
  },

  'cart.merge'(products){
    check(products, Array);
    for(let i = 0; i < products.length; i++) {
      Carts.update({owner: Meteor.userId()}, {
        $push: {
          products: [products[i]]
        }
      })
    }
  },

  'user.addToCart'(product) {
    check(product, Array);
    return Carts.update({owner: Meteor.userId()}, {
      $push: {
        products: [product]
      }
    })
  },

  'user.removeFromCart'(product){
    check(product, Array);
    return Carts.update({owner: Meteor.userId()}, {
      $pull: {
        products: [product]
      }
    });
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

  'user.placeOrder'(products, total){
    check(products, Array);
    check(total, Number);
    let totes = 0;
    let prods = '';
    for(let i = 0; i<products.length; i++) {
      totes += parseInt(products[i][1]);
      prods += products[i][0] + ', ';
    }
    console.log('placed fake order for ' + totes + '! I bought ' + products.length + ' products: ' + prods);
  },

  'orders.create'(prods, total, user){
    check(products, Array);
    check(total, Number);
    check(user, Object);
    return Orders.insert({
      owner: Meteor.userId() !== null ? Meteor.userId() : "",
      products: products,
      user: user
    });
  }

});


