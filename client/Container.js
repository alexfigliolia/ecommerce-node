import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';
import App from './App.js';

export default withTracker(() => {
  const users = Meteor.subscribe('userData');
  const id = Meteor.userId();
  const user = Meteor.user();
  const userCarts = Meteor.subscribe('carts');
  const cartsReady = userCarts.ready();
  const carts = Carts.find().fetch();
  const cartsExist = cartsReady && !!carts;
  return {
    id,
    user,
    cartsReady,
    userCarts,
    cartsExist,
    carts
  };
})(App);