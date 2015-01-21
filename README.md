Project-Evolution Seed
======================

Retrieve this repo to start a new application using Project Evolution

# Getting started

Create a new git repo and commit the HEAD of the master branch of this repo to the new repo.

DO NOT WORK DIRECTLY AGAINST THIS REPO!

Create a develop branch and commit to the new repo:

```
git checkout -b develop
git push -u origin develop
```

Follow the [gitflow] (http://nvie.com/posts/a-successful-git-branching-model/) procedures (mostly) for working on features, bugs, etc.

## Install Dependencies
From a git shell, change to the repo working folder and execute the command:

`npm install`

## Main Entry Point
To facilitate production deployment, the main entry point file must be given a "unique" name.

Be sure to rename the file content/app.js to something representative of the project that is under construction.

For instance, for the evolution admin "product", the file has been renamed mobileconnect.js.


## Package definition
Customize the package definition to reflect the product/project being developed.

Select a project/product name and enter it into the package.json file as shown below.
Additionally, set the main entry point file name in the scripts/start setting, as shown below.

```
{
  "name": "PROVIDE A PROJECT/PRODUCT NAME",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node content/MAINENTRYPOINT",
    "test": "mocha test/unit/server --globals NODE_CONFIG,exportscoffeeScript"
  },

```

## Configuration
A default configuration file is provided, but several settings MUST be supplied. In general, the defaults are sufficient for any setting that is not addressed here.

### Ports
To support the production environment, each running instance must be configured with a unique port numbers for the web, socket, and REST server. All servers are optional and will be created based on the providers that are implemented. 
In general, the ports will be grouped together into a contiguous range. Please consult with the Evo team when choosing a starting port number to use.
Enter the port number into the configuration as presented below.

#### Web Server Port
```
module.exports = {
	port : <SUPPLY A PORT FOR THE APPLICATION WEB SERVER>,
	...
};
```

#### Socket Server Port
```
module.exports = {
	...
	data : {
		...
		socket : {
			server : {
				...
				port :  <SUPPLY A PORT FOR THE APPLICATION SOCKET SERVER>,
				...
			}
		},	
	...
};
```

#### REST Server Port
```
module.exports = {
	...
	data : {
		...
		REST : {
			server : {
				port :  <SUPPLY A PORT FOR THE APPLICATION REST SERVER>
			}
		}
	}
};
```

### Log File Name
```
module.exports = {
	...
	log : {
		...
		server : {
			...			
			transports : {
				...
				file : {
					...
					filename : '<USE THE SAME NAME AS THE MAIN ENTRY POINT FILE>.app.log',
					...
				},
				...
			}
		},
	},
	...
};
```
### Grunt build

#### **Product Version** and **Product Build Date**

The version and build date are updated automatically when grunt build is executed.

To execute the grunt build, execute the following command:

`grunt build`

The **grunt-bumpup** task uses information of package.json.
```json
{
  "version": "0.0.1",
  "date": "2015-01-21 11:44:06 +00:00"
}
```
It is created a **build.json** in **content\shared\public\dist** folder.

You can use the information of build.json with injecting **core** module in a **angular.js controller**.
```javascript
var version = core.meta.build.app.version;
var date = core.meta.build.app.date;
```
To format date build using moment.js
```javascript
var date = moment(core.meta.build.app.date,'YYYY-MM-DD HH:mm:ss Z').toDate();
```

###AngularJS Directive

Steps to use "about" directive.

* Add the line below in layout.jade
```jade
    include /core/shared/scripts
```

* Add the line below in index.jade
```jade
    include /core/shared/caiAbout
```
* Add the line below in your page
```jade
    cai-About(data-ng-model="aboutModal")
```
* You can use the below example to show the "about modal"
```jade
    button(class="btn btn-primary", data-ng-click="aboutModal = true") #{__("btnOpenAbout")}
```


## Testing
A set of default configuration files are provided, but several settings MUST be supplied. In general, the defaults are sufficient for any setting that is not addressed here.

All configuration files are in the test/config/ folder.

A set of scripts are provided to execute tests. All scripts are in the scripts/ folder.

### All Tests
To execute all tests and generate output to files, execute the following command: 

##### Windows
`scripts\test.bat`

##### *nix
`./scripts/test.sh`

### Unit Testing
Unit testing is divided into Server and Client. Mocha is used in conjunction with Chai, Sinon, and other helpful libraries for both Server and Client testsing.

#### Server
To execute server tests (only), execute the following command: (obviously, write the tests first!)

`npm test`

Or, to capture the output to a file:

##### Windows
`scripts\server-test.bat`

##### *nix
`./scripts/server-test.sh`

#### Client
Client testing makes use of Karma in addition to the other tools. 

##### Configuration
There are 2 configuration files for Karma, 1 to run all tests and capture the output to a file and another for development purposes that can be used to isolate testing and interactively test.

test/config/karma.conf.js is the configuration that will run ALL tests and capture the output to a file. This configuration should not be used (or modified) during development.

test/config/karma-dev.conf.js is the configuration that can be used during development to perform isolated and interactive testing. This configuration should be used (and modified) during development.

To execute client tests (only), execute the following command: (obviously, write the tests first!)

##### Windows
`scripts\client-test.bat`

##### *nix
`./scripts/client-test.sh`


### End to End (e2e) Testing
Protractor is used in conjunction with Selenium. Protractor uses a flavor of Jasmine and the syntax of tests is slightly different from the Server/Client tests.

##### Selenium
To start the selenium server, execute the following command:

###### Windows
`scripts\start-selenium.bat`

###### *nix
`./scripts/start-selenium.sh`


##### Configuration
There are 2 configuration files for Protractor, 1 to run all tests and capture the output to a file and another for development purposes that can be used to isolate testing.

test/config/protractor.conf.js is the configuration that will run ALL tests and capture the output to a file. This configuration should not be used (or modified) during development.

test/config/protractor-dev.conf.js is the configuration that can be used during development to perform isolated and interactive testing. This configuration should be used (and modified) during development.

To execute e2e tests (only), execute the following command: (obviously, write the tests first!)

##### Windows
`scripts\e2e-test.bat`

##### *nix
`./scripts/e2e-test.sh`


## Start the project
From a command shell, execute the following command:

`npm start`
