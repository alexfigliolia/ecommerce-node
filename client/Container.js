import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';
import App from './App.js';

export default AppContainer = createContainer(() => {
  const users = Meteor.subscribe('userData');
  const id = Meteor.userId();
  const user = Meteor.user();
  const userCarts = Meteor.subscribe('carts');
  // const userEmployees = Meteor.subscribe('employees');
  // const userGroup = Meteor.subscribe('group');
  const cartsReady = userCarts.ready();
  // const employeesReady = userEmployees.ready();
  // const groupReady = userGroup.ready();
  const carts = Carts.find().fetch();
  // const employees = Employees.find({owner: id}).fetch();
  // const group = Group.find({owner: id}).fetch();
  const cartsExist = cartsReady && !!carts;
  // const employeesExist = employeesReady && !!employees;
  // const groupExists = groupReady && !!group;
  return {
    id,
    user,
    cartsReady,
  //   employeesReady,
  //   groupReady,
    userCarts,
  //   userEmployees,
  //   userGroup,
    cartsExist,
  //   employeesExist,
  //   groupExists,
    carts,
  //   employees,
  //   group
  };
}, App);