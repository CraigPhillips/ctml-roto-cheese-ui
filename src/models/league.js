const _ = require('privatize')();
const mithril = require('mithril');

class League {
  constructor(m = mithril) {
    _(this).m = m;
    this.teams = [];
  }

  load() {
    console.log('loading called');

    return _(this).m.request({
      method: 'GET',
      url: 'data/teams.json',
    })
    .then((result) => {
      this.currentWeek = result.currentWeek;
      Object
        .keys(result)
        .filter(k => k !== 'currentWeek')
        .forEach(k => { this.teams[k] = result[k]; });

      console.log(this);
    });
  }
}

module.exports = {
  League
};
