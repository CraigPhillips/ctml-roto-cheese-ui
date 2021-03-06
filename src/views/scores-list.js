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
    const weeks = [];
    for (let i = League.maxWeek; i > 0; i -= 1) weeks.push(i);

    return m('.scores-list', [
      m('select', { onchange: (e) => { ScoresList.weekSelected(e, League); } }, weeks.map((week) =>
        m(
          'option',
          {
            selected: week === parseInt(League.currentWeek) ? 'selected' : '',
            value: week,
          },
          `Week ${week}`)
      )),
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
                onclick: () => {
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

  weekSelected: (event, League) => {
    document.location.href =
      `?week=${event.target.options[event.target.selectedIndex].value}`;
  },
};

module.exports = {
  ScoresList,
};
