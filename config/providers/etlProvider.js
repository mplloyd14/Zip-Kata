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
        },
        {
            domain: null,
            method: 'post',
            mode: 'none',
            sendTransformedPayload: true,
            routes: [
                '/fu/export'
            ],
            module: 'lib/demoExportETL.js'
        }
    ]
};
