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
  res.status(200).send('ok');
};

module.exports.signUp = (req, res, next) => {
  // отримати дані {name, email, password}
  const { body } = req;
  // перевірити, чи користувач з таким імейлом існує
  if (body.email in users) {
    // якщо існує, то помилка
    return next(createHttpError(409, 'User with this email already exist'));
  }
  // інакше створити кори-ча
  users[body.email] = { ...body, id: Math.random() };
  // відправити {id, name, email}
  const preparedUser = { ...users[body.email] };
  delete preparedUser.password;
  res.status(201).send(preparedUser);
};
