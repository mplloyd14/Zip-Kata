var config = require('config');

module.exports = function(context) {
    var host = config.admin.host;
    var protocol = config.admin.protocol;

    var urlbase = protocol + '://' + context.company + '.' + host + '/product/' + context.product;
    return {
        get_sales_people: urlbase + '/Salespeople/',
        get_customers: urlbase + '/Customer/',
        get_companies: urlbase + '/Companies/'
    };
}