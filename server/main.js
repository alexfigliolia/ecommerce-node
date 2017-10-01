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

Accounts.onCreateUser((options, user) => {
  user.name = options.name;
  user.paymentInfo = {
    card: "",
    cvv: "",
    expiration: "",
  };
  user.billingInfo = {
  	name: "",
  	address: "",
  	city: "",
  	state: "",
  	zip: ""
  };
  user.shippingInfo = {
  	name: "",
  	address: "",
  	city: "",
  	state: "",
  	zip: ""
  };
  return user;
});

Meteor.methods({
	'products.get'(){
		return client.request(client.endpoints.PRODUCTS)
	  .then(resp => resp)
	  .catch(err => console.log('err', err));
	}
});


