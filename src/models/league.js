const m = require('mithril');

const League = {
  load: () => {
    return m.request({
      method: 'GET',
      url: 'data/teams.json',
    })
    .then((result) => {
      League.currentWeek = result.currentWeek;
      League.teams = [];
      Object
        .keys(result)
        .filter(k => k !== 'currentWeek')
        .forEach(k => { League.teams[parseInt(k)] = result[k]; });
    })
    .then(() => m.request({
      method: 'GET',
      url: `data/scores-week-${League.currentWeek}.json`,
    }))
    .then((result) => {
      Object
        .keys(result)
        .filter(k => k !== 'weekNumber' && k !== 'timestamp')
        .forEach(k => { League.teams[parseInt(k)].scores = result[k]; });

      League.teams.sort((a, b) => a.scores.rank - b.scores.rank);
      League.timestamp = result.timestamp;

      setTimeout(League.load, 5000);
    });
  },

  teams: [],
}

module.exports = {
  League,
};
