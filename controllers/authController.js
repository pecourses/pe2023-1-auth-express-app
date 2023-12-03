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
  // отримати дані { email, password}
  const { body } = req;
  // чи існує користувач з імейлом
  if (!(body.email in users)) {
    // якщо ні, то помилка
    return next(createHttpError(404, 'User is not exist'));
  }
  // якщо так
  //   чи співпадає пароль
  if (body.password !== users[body.email]?.password) {
    //      ні - помилка
    return next(createHttpError(401, 'Email or passwors is incorrect'));
  }
  //      так - відправити його дані {id, name, email}
  const prepatedUser = { ...users[body.email] };
  delete prepatedUser.password;
  res.status(200).send(prepatedUser);
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
