var config = require("config")
  , rest   = require("projevo-core").RestClient;

module.exports = {
  "type": "Socket",
  "services": {
    "submitEDXTicket": {
      "handler": function (o, context) {
        // var url = config.apiServer.host + "/api/ticket/submit";
        var url = config.apiServer.host + '/company/' + context.company + '/product/' + context.product + '/mobileticket/submit';
        console.log("[SocketProvider]:submitEDXTicket:" + url);
        return rest.post(url, o, {json: true});
      }
    }
  }
};
