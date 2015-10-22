
module.exports = {
  "type": "REST",
  "services": {
    "/mobileticket/submit": [
      {
        "method" : "post",
        "version" : "0.0.1",
        "external": true,
        "outbound": true,
        "context": "none",
        "service": "EDXTicketService"
      }
    ]
  }
};

/** Company Definition
{
    "_id" : ObjectId("562917201086ec967362528e"),
    "code" : "cai",
    "description" : "Command Alkon Seed",
    "status" : "active",
    "branding" : {
        "primary" : "@color-primary: #00add5;",
        "secondary" : "@color-secondary: #00add5;;",
        "logo" : "@logo: 'icon-commerce.png';"
    },
    "settings" : {
        "dataEndPoints" : {
            "EDXTicketService" : {
                "EndPointAddress" : "http://localhost",
                "Port" : 8080,
                "Type" : "REST",
                "SubType" : "Client",
                "context" : "none"
            }
        }
    },
    "products" : [
        {
            "code" : "peseed",
            "settings" : {}
        }
    ]
}
 */

/**
Mock EDX server http://localhost:8080

function submitTicket(req, res, next) {
    var response =  {
        "message": "OK",
        "status": 200,
        "data": req.body
    };

    res.writeHead(200, { 'Content-type': 'application/json' });
    res.write(JSON.stringify(response));
    res.end();

    next();
}
server.post("/mobileticket/submit", submitTicket);
 */
