const _ = require('privatize')();
const mithril = require('mithril');

const { League } = require('../models/league.js');

class ScoresList {
  constructor(m = mithril, LeagueClass = League) {
    _(this).m = m;
    _(this).league = new LeagueClass();
  }

  oninit(vnode) {
    console.log('initializing');
    // docs explicitly say not to use the parenthesis for this method but that
    // doesn't seem to work so who knows?
    return _(vnode.tag).league.load();
  }

  view(vnode) {
    console.log('rendering');
    const { league, m } = _(vnode.tag);
    return m('.league-list', Object.keys(league.teams).map((k) => {
      return m('p', league.teams[k].name);
    }));
  }
};

module.exports = {
  ScoresList,
};
