'use strict';

module.exports = {
    type: 'ETL',
    transforms: [
        {
            domain: 'fubars',
            method: 'post',
            mode: 'upsert',
			sendTransformedPayload: true,
            routes: [
                '/fu/:fu',
                '/fu/:fu/bar/:bar',
                '/bar/:bar'
            ],
            module: 'lib/demoETL.js'
        }
    ]
};
