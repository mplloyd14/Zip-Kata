'use strict';

module.exports = {
    type: 'ETL',
    transforms: [
        {
            domain: 'fubars',
            schedule: '0 * * * * *',
            routes: [
                '/fu/:fu',
                '/fu/:fu/bar/:bar',
                '/bar/:bar'
            ],
            selector: function(fubar) {
                return {fu: fubar.fu};
            },
            transformer: function(payload) {
                return payload.body;
            }
        }
    ]
};
