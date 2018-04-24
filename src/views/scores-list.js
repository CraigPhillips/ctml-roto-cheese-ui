const m = require('mithril');

function toggleDetails() {
  console.log('toggling');
}

const { League } = require('../models/league');

const ScoresList = {
  oninit: League.load,

  view: (vnode) => {
    const timestamp = League.timestamp ?
      (new Date(League.timestamp)).toLocaleString() : undefined;

    return m('.scores-list', [
      m('h4', League.currentWeek ? `Week ${League.currentWeek}` : ''),
      m('ol.league-list', League.teams.map((team) => {
        const cats = Object.keys(team.scores)
          .filter(k => typeof(team.scores[k]) === 'object');
        const detailsVisible = `${team.url} details visible`;
        const detailsClass = vnode.state[detailsVisible] ? '.show' : '';

        return m('li', [
          m('.team-rank', team.scores.rank),
          m('.team-logo', [m('img', { src: team.logo })]),
          m('.team-name', [
            m('a', { href: team.url }, team.name),
          ]),
          m('.team-score', [
            m('span', team.scores.total),
            m(
              'button.detail-toggle',
              {
                onclick: (event) => {
                  vnode.state[detailsVisible] = !vnode.state[detailsVisible];
                },
              },
              vnode.state[detailsVisible] ? m.trust('&ndash;') : '+'),
          ]),
          m(`ol.score-details${detailsClass}`, cats.map((cat) => {
            let value = team.scores[cat].rawScore;
            if (value === null) value = '-';

            return m('li', [
              m('.value', `${cat.toUpperCase()}: ${value}`),
              m('.rank', `Place: ${team.scores[cat].rank}` +
                (team.scores[cat].thisTieCount > 1 ?
                  ` (${team.scores[cat].thisTieCount}-way tie)` : '')),
              m('.score', `(+${team.scores[cat].rotoScore})`),
            ]);
          })),
        ]);
      })),
      m('h5', timestamp? `Last updated: ${timestamp}` : ''),
    ]);
  },
};

module.exports = {
  ScoresList,
};
