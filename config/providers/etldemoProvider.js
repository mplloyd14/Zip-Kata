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
            module: 'lib/demoETL.js'
        }
    ]
};
