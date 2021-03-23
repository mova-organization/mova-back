const router = require('express').Router();

const actions = require('./actions');
const { BaseController } = require('../../../root');

class WordsController extends BaseController {
  get router() {
    router.get('/api/words', this.actionRunner(actions.ListWordsAction));
    router.get('/api/word/:id', this.actionRunner(actions.GetWordByIdAction));
    router.post('/api/word', this.actionRunner(actions.CreateWordAction));
    router.patch('/api/word/:id', this.actionRunner(actions.UpdateWordAction));
    router.delete('/api/word/:id', this.actionRunner(actions.RemoveWordAction));
    router.put('/api/word/like/:id', this.actionRunner(actions.AddLikeAction));
    router.put('/api/word/dislike/:id', this.actionRunner(actions.AddDislikeAction));
    // router.post('/api/words/removelike', this.actionRunner(actions.removeLike));

    return router;
  }

  async init() {
    console.log(`${this.constructor.name} initialized...`);
  }
}

module.exports = { WordsController };
