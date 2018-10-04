const m = require('mithril');

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const League = {
  load: () => {
    return m.request({
      method: 'GET',
      url: 'data/teams.json',
    })
    .then((result) => {
      League.currentWeek = getParameterByName('week') || result.currentWeek;
      League.maxWeek = result.currentWeek;
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
