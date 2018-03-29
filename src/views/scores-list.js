const m = require('mithril');

const { League } = require('../models/league');

const ScoresList = {
  oninit: League.load,

  view: () => {
    return m('ol.league-list', League.teams.map((team) => {
      return m('li', [
        m('.team-rank', team.scores.rank),
        m('.team-logo', [m('img', { src: team.logo })]),
        m('.team-name', team.name),
        m('.team-score', team.scores.total),
      ]);
    }));
  },
};

module.exports = {
  ScoresList,
};
