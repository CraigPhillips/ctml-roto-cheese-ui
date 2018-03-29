const m = require('mithril');

const { League } = require('../models/league');

const ScoresList = {
  oninit: League.load,

  view: () => {
    return m('ol.league-list', Object.keys(League.teams).map((k) => {
      return m('li', League.teams[k].name);
    }));
  },
};

module.exports = {
  ScoresList,
};
