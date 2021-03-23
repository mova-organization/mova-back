const { ListWordsAction } = require('./ListWordsAction');
const { GetWordByIdAction } = require('./GetWordByIdAction');
const { CreateWordAction } = require('./CreateWordAction');
const { UpdateWordAction } = require('./UpdateWordAction');
const { RemoveWordAction } = require('./RemoveWordAction');
const { AddLikeAction } = require('./AddLikeAction');
const { AddDislikeAction } = require('./AddDislikeAction');

module.exports = {
  ListWordsAction,
  CreateWordAction,
  GetWordByIdAction,
  UpdateWordAction,
  RemoveWordAction,
  AddLikeAction,
  AddDislikeAction,
};
