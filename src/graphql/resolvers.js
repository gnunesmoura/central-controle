// const moment = require('moment');
// const bcrypt = require('bcrypt');
// // const UserDao = require('../dao/user');

// const user = (parent, args, context) => {
//   // to-do throw an error.
//   if (!context.user) return null;

//   return context.user;
// };

// const login = async (parent, args, context) => {
//   const { username, password } = args;
//   const user = UserDao.findByUsername(username);

//   const match = await bcrypt.compare(password, user.passwordHash);

//   return { token: 'tokenSuperSecreto', expirationDate: moment().add(2, 'hours').toISOString() };
// };

// module.exports = {
//   Query: {
//     user,
//     login,
//   },
// };
