const _ = require('privatize')();
const mithril = require('mithril');

class CheesePane {
  constructor(m = mithril) {
    _(this).m = m;
  }

  view() {
    return _(this).m('h2', {}, 'CTML Roto Cheese');
  }
};

module.exports = {
  CheesePane,
};
