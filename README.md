API Server Demonstration
======================

This project illustrates the features provided by the API Server for applications, including:

* External routes
* Inbound security
* Outbound security
* ETL

# Getting started

Clone the repo and checkout the api_server branch or retrieve the zip of the api_server branch from github.

Many features actually run within the API Server, so be sure to retrieve that repo as well.

The Project Evolution repo is necessary for login, so retreive that repo.


## Install Dependencies
From a git shell, change to the various project working folders and execute the command:

`npm install`

## Load seed data
WARNING! This will destroy any existing seed data that you may already have!

From a command shell, execute the following command from the demo working folder:

##### Windows
`scripts\import.bat`

##### *nix
`./scripts/import.sh`


## Start the projects
From a command shell, execute the following command from the project evolution working folder:

`npm start`

From a another command shell, execute the following command from the api server working folder:

`npm start`


From another command shell, execute the following command from the demo working folder:

`npm start`


## Start the Mock Partner REST Services

From yet another command shell, execute the following command from the demo working folder:

`node test/mock-rest-service/mock-rest-service.js`


## Browse to the page

### Companies and Users

There are 3 companies, each with 1 user:
* acme
  - acuser/go
* ss
  - ssuser/go
* cc
  - ccuser/go

#### ACME
Acme has no security defined

#### SS
Spacely Sprockets has basic security defined
  
#### CC
Cogswell Cogs has enhanced security defined
  
From a desktop browser

`http://<company>.localhost:6700/product/apiserverdemo`

Substituting the company code for the level of security to demonstrate.

## Exchange some data
Send data from the browser to the "external partner" (as represented by the Mock REST Services) and send data from the "external partner" (as represented by the Mock REST Client) to the browser.

### Outbound
Enter some data in the page and click the Send button.

The Demo server will send a request to the API Server which will forward the request to the Mock REST Service.

The Mock REST Service will log the results; a real programmer would have made the mock service evaluate the security and emit a pass/fail response...

The level of security depends on the company/user that is logged on.

(The goal of the Outbound is to prove that evo properly includes the security settings on the request)

##### None
Plain request will be logged with no Authorization headers.

##### Basic
Request will be logged with the Basic Authorization header set.

##### Enhanced
Request will be logged with the Basic Authorization header set and the AuthSignature header set.

### Inbound
1 inbound route is provided:

* /inbound/name/:name

Use the Mock REST Client script to send a "secure" rest operation.

From a command shell, run the following from the demo project working folder:
```
node test/mock-rest-client/mock-rest-client.js -u edx -p edx -f test/mock-rest-client/data.json -c "application/json" http://<company>.localhost:4010/product/apiserverdemo/inbound/name/Frank
```
Substitute the company code corresponding to the logged on user.

(For more mock rest client options, run:)
```
node test/mock-rest-client/mock-rest-client.js --help
```

The client will send a request to the API Server which will forward the request to the Demo server, which will event the data to the browser.

(The goal of the Inbound is to prove that evo properly enforces the security settings on the request)

##### None
The API Server will not enforce security.

##### Basic
The API Server will enforce Basic security (authentication only).

##### Enhanced
The API Server will enforce Basic security (authentication and message integrity).

#### Generate some failures

##### Invalid password
Log on to company *ss* as user *ssuser*

From a command shell, run the following from the demo project working folder:
```
node test/mock-rest-client/mock-rest-client.js -u edx -p abc -f test/mock-rest-client/data.json -c "application/json" http://ss.localhost:4010/product/apiserverdemo/inbound/name/Frank
```

The client should report a 401 - Invalid Credentials error, as the password supplied does not match

##### Message integrity violated
Log on to company *cc* as user *ccuser*

From a command shell, run the following from the demo project working folder:
```
node test/mock-rest-client/mock-rest-client.js -u edx -p edx -s "thisisasecret" -f test/mock-rest-client/data.json -c "application/json" http://ss.localhost:4010/product/apiserverdemo/inbound/name/Frank
```

The client should report a 401 - Invalid Credentials error, as the message integrity signature does not match
