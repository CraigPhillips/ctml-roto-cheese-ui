const _ = require('privatize')();
const mithril = require('mithril');

class CheesePane {
  constructor(m = mithril) {
    _(this).m = m;
  }

  view(context) {
    const m = _(context.tag).m;
    return m('#ctml-roto-cheese', [
      m('h3', 'CTML Roto Cheese'),
    ]);
  }
};

module.exports = {
  CheesePane,
};
