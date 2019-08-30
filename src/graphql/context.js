const getUser = token => (token === 'tokenDeAcesso'
  ? ({ id: 12345, name: 'bobão', roles: ['user', 'admin'] }) : null);

const context = ({ req }) => {
  const token = req.headers.authorization || '';

  const user = getUser(token);

  return { user };
};

module.exports = context;
