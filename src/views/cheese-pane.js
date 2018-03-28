const _ = require('privatize')();
const mithril = require('mithril');

const { ScoresList } = require('./scores-list');

class CheesePane {
  constructor(m = mithril, ScoresListView = ScoresList) {
    _(this).m = m;
    _(this).scores = new ScoresListView();
  }

  view(context) {
    const { m, scores } = _(context.tag);

    return m('#ctml-roto-cheese', [
      m('h3', 'CTML Roto Cheese'),
      m(scores),
    ]);
  }
};

module.exports = {
  CheesePane,
};
