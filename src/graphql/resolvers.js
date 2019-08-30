
const user = (parent, args, context) => {
  // to-do throw an error.
  if (!context.user) return null;

  return context.user;
};

module.exports = {
  Query: {
    user,
  },
};
