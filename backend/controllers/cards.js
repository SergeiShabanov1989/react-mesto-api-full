const Card = require('../models/card');
const { OK, CREATED } = require('../utils/utils');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: req.user._id });
    res.status(CREATED).send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId)
      .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'));
    if (req.user._id === card.owner.toString()) {
      card.remove();
      return res.send({ message: 'Карточка удалена' });
    }
    return next(new ForbiddenError('Нет доступа'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некорректно передан id'));
    }
    return next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new Error('Not Found'));
    return res.status(OK).send(card);
  } catch (err) {
    if (err.message === 'Not Found') {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некорректно передан id'));
    }
    return next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new Error('Not Found'));
    return res.status(OK).send(card);
  } catch (err) {
    if (err.message === 'Not Found') {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некорректно передан id'));
    }
    return next(err);
  }
};
