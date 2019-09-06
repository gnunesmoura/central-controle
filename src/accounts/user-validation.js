
const validateNewUser = (user) => {
  // For example we can allow o@graphql-modules/corenly some kind of emails
  if (user.email.endsWith('.xyz')) {
    throw new Error('Invalid email');
  }
  return user;
};

module.exports = { validateNewUser };
