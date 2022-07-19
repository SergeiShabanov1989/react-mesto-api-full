const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const { OK, CREATED } = require('../utils/utils');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(OK).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'));
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequest('Некорректно передан id'));
    }
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashPassword,
    });
    return res.status(CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequest('Переданы некорректные данные при создании пользователя'));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Такой email уже зарегистрирован'));
    }
    return next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'));
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
    }
    return next(err);
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'));
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
    }
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError('Неправильный email или пароль'));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError('Неправильный email или пароль'));
    }
    const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
    return res.status(OK).send({ token });
  } catch (err) {
    if (err.statusCode === 401) {
      return next(new UnauthorizedError('Вы не авторизованы'));
    }
    return next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(OK).send(user);
  } catch (err) {
    next(err);
  }
};
