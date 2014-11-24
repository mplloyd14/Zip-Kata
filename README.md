Project-Evolution ETL Demo
======================

This simple demonstration presents an example of an ETL for a REST route.

# Getting started

Clone the repo and checkout the etl-demo branch or retrieve the zip of the etl-demo branch from github.

Clone the Project-Evolution repo and checkout the develop branch or retrieve the zip of the Project-Evolution develop branch from github.

(User authentication is required: usage of the "backdoor" is acceptable, but viewing different users and permission states will be more cumbersome)

Clone the api-server repo and checkout the develop branch or retrieve the zip of the api-server branch from github.

## Install Dependencies
From a git shell, change to the demo working folder and execute the command:

`npm install`

From a git shell, change to the Project-Evolution working folder and execute the command:

`npm install`

From a git shell, change to the api server working folder and execute the command:

`npm install`


## Load seed data
WARNING! This will destroy any existing seed data for Evolution that you may have!

From a shell, change to the demo working folder and execute the command:

##### Windows
`scripts\import.bat`

##### *nix
`./scripts/import.sh`

## Start the projects
From a shell, change to the demo working folder execute the following command:

`npm start`

From another command shell, change to the Project-Evolution working folder and execute the following command:

`npm start`

From a yet another command shell, change to the api server working folder execute the following command:

`npm start`

## Update the "hosts" file to add "DNS" support for company context
There are 2 mock Companies: SS and CC

The exact location of the file varies by operating system

Ensure these entries are present:

```
127.0.0.1 ss.localhost
127.0.0.1 cc.localhost
```

## Browse to the page to view data

From either a desktop browser

`http://<COMPANY>.localhost:6600/product/etldemo`

Substitute one of the mock company codes for <COMPANY>.

`http://cc.localhost:6600/product/etldemo`


Enter "filter" criteria into the text boxes. Click the Get button to retrieve data.

(The filter establishes the room criteria and is necessary to link it to the incoming REST operation)

## Post Data

Using your favorite REST client (curl, Advanced Rest Client, XHR Poster, to name a few), POST data to the API Server:

`http://cc.localhost:4010/product/etldemo/fu/fu`

The test/data folder contains json files that can be posted to the service.
