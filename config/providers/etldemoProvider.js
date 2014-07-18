'use strict';

module.exports = {
    type: 'ETL',
    transforms: [
        {
            domain: 'conferences',
            schedule: '0 * * * * *',
            routes: ['/etldemo/conference/code/:code'],
            selector: function(conference) {
                return {code: conference.code};
            },
            transformer: function(payload) {
                return payload.body;
            }
        },
        {
            domain: 'teams',
            schedule: '0 * * * * *',
            routes: ['/etldemo/team/code/:code'],
            selector: function(team) {
                return {code: team.code};
            },
            transformer: function(payload) {
                return payload.body;
            }
        },
        {
            domain: 'games',
            schedule: '0 * * * * *',
            routes: ['/etldemo/game/home/:home/visitor/:visitor/date/:date'],
            selector: function(game) {
                return {
                    home: game.home,
                    visitor: game.visitor,
                    date: game.date
                };
            },
            transformer: function(payload) {
                return payload.body;
            }
        }
    ]
};
