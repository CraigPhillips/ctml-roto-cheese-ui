const m = require('mithril');

const League = {
  load: () => {
    return m.request({
      method: 'GET',
      url: 'data/teams.json',
    })
    .then((result) => {
      League.currentWeek = result.currentWeek;
      League.teams = {};
      Object
        .keys(result)
        .filter(k => k !== 'currentWeek')
        .forEach(k => { League.teams[k] = result[k]; });
    })
    .then(() => m.request({
      method: 'GET',
      url: `data/scores-week-${League.currentWeek}.json`,
    }))
    .then((result) => {
      console.log(result);
      Object
        .keys(result)
        .filter(k => k !== 'weekNumber')
        .forEach(k => { League.teams[k].scores = result[k]; });
    });
  },

  currentWeek: -1,
  teams: {},
}

module.exports = {
  League,
};
