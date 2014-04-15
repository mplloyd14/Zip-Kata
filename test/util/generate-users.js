var _ = require('lodash-node')
	q = require('q'),
    userUtils = require('./user-utils');

var count = process.argv.length > 2 ? process.argv[2] : 100;
var host = process.argv.length > 3 ? process.argv[3] : undefined;
var users = [];

var userTemplate = {
    "userName" : "",
    "firstName": "",
    "lastName": "",
    "email" : "",
    "passwordLifetime": 0,
    "resetPassword" : false,
    "loginAttempts" : 0,
    "pass": "go",
    "status": "Active",
    "company": "",
    "defaultProduct": "",
    "products": []
};

var productTemplateCommerce = {
    "product": "commerce",
    "instance": "commerce",
    "roles": [
        "appadmin",
        "appuser"
    ],
    "settings": {
        "sms": "",
        "customer": {
            "code": "",
            "name": ""
        },
        "sales": [],
        "timeZone" : {
            "value" : "-0700",
            "operator" : "-",
            "hours" : "07",
            "minutes" : "00"
        },
        "permissions" : {
            "batchWeights": true,
            "truckTimes": true,
            "pricing": true,
            "mapping": true,
            "acctInfo": true,
            "docImage": true,
            "futureOrderEmail": true,
            "changeCustomer": true
        }
    }
};

var company = 'krc';
while (count-- > 0) {
	var user = _.clone(userTemplate);
    var product = _.clone(productTemplateCommerce);
    
    product.instance += '-' + company;
    
    user.userName = company + 'user' + count;
    user.firstName = company;
    user.lastName = 'user' + count;
    user.email = company + 'user' + count + '@' + company + '.com';
    user.company = company;
    user.defaultProduct = product.product;
    user.products.push(product);
    
    users.push(user);
}
userUtils.seedUsers(users, host);
