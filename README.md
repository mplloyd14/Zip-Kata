Project-Evolution Custom User Admin Demo
======================

This simple demonstration presents a custom user administration; the "right side" of the standard evolution user admin view.

# Getting started

Clone the repo and checkout the custom-admin-demo branch or retrieve the zip of the custom-admin-demo branch from github.

Custom admin features actually run within Project Evolution, so be sure to retrieve that repo as well.


## Install Dependencies
From a git shell, change to the demo working folder and execute the command:

`npm install`

## Load seed data
WARNING! This will destroy any existing seed data for MOBILEconnect that you may have!

##### Windows
`scripts\import.bat`

##### *nix
`./scripts/import.sh`

## Custom Settings

Custom settings are stored with the standard Evolution user. Each product can have its own set of custom settings.


## Configuring Evolution

Evolution runs the application that administrates user and it is Evolution that will consume and "run" the custom settings on behalf of a product.

Evolution must be made aware of any product that contains custom settings.

The evolution configuration contains settings that identify the location of a product:

```
 ...
 paths: {
	products:{
		prodA: {
			root: "/path/to/prodA/content/admin/"
		},
        prodB: {
            root: "/path/to/prodA/content/admin/"
        }
	}
  },
  ...
```

Add an entry for the product to the development/production.js configuration file in the *Evolution configuration*



## Start the projects
From a command shell, execute the following command from the evolution working folder:

`npm start`


From another command shell, execute the following command from the demo working folder:

`npm start`


## Browse to the page

From a desktop browser

`http://acme.localhost:5000/product/customadmindemo/admin`

It will redirect to the Evolution Administration application. Add/Edit a user to see the custom settings.

