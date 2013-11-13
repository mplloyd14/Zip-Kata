var log = require('projevo-core').Logger;

module.exports = {
  type: 'Job',
  services: [
    {
      name: 'AnnoyingJob',
      schedule: '0 * * * * *', // Runs every minute
      callback: function() { log.debug("Annyoing Job Executing!"); }
    },
    {
      name: 'ImmediateJob',
      callback: function() { log.debug("I'm an immediate job"); }
    },
    {
      name: 'EvenMoreAnnoyingJob',
      schedule: '*/10 * * * * *', // Runs every 10 seconds
      callback: function() { log.debug("I'm even more annoying!"); }
    }
  ]
 };