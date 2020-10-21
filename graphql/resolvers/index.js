const productResolvers = require('./products');
const usersResolvers = require('./users');


module.exports = {
  Query: {
    ...productResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...productResolvers.Mutation,
  }
};