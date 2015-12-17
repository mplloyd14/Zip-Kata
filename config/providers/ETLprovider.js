'use strict';

module.exports = {
    type: 'ETL',
    transforms: [
        {
            domain: 'etl-test',
            sendTransformedPayload : true,
            method: 'post',
            routes: [
                '/test'
            ],
            module: 'lib/demoETL.js'
        }
    ]
};