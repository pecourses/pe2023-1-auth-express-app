const createHttpError = require('http-errors');

const users = {
  'user1@com': {
    id: Math.random(),
    name: 'Test',
    email: 'user1@com',
    password: '123456',
  },
};

module.exports.login = (req, res, next) => {
  const { body } = req;

  if (!(body.email in users)) {
    return next(createHttpError(404, 'User is not exist'));
  }

  if (body.password !== users[body.email]?.password) {
    return next(createHttpError(401, 'Email or passwors is incorrect'));
  }

  const prepatedUser = { ...users[body.email] };
  delete prepatedUser.password;
  res.status(200).send(prepatedUser);
};

module.exports.signUp = (req, res, next) => {
  const { body } = req;

  if (body.email in users) {
    return next(createHttpError(409, 'User with this email already exist'));
  }

  users[body.email] = { ...body, id: Math.random() };

  const preparedUser = { ...users[body.email] };
  delete preparedUser.password;
  res.status(201).send(preparedUser);
};
