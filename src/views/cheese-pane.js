const m = require('mithril');

const { ScoresList } = require('./scores-list');

class CheesePane {
  view() {
    return m('#ctml-roto-cheese', [
      m('h3', 'CTML Roto Cheese'),
      m(ScoresList),
    ]);
  }
};

module.exports = {
  CheesePane,
};
