Project-Evolution Permission Demo
======================

This simple demonstration presents permission based content and data delivery: the markup and/or data presented is determined by the particular role and/or permissions
associated with the logged on user.

# Getting started

Clone the repo and checkout the permission_demo branch or retrieve the zip of the permission_demo branch from github.

Clone the Project-Evolution repo and checkout the develop branch or retrieve the zip of the Project-Evolution develop branch from github.

(User authentication is required: usage of the "backdoor" is acceptable, but viewing different users and permission states will be more cumbersome)

## Install Dependencies
From a git shell, change to the demo working folder and execute the command:

`npm install`

From a git shell, change to the Project-Evolution working folder and execute the command:

`npm install`


## Load seed data
WARNING! This will destroy any existing seed data for MOBILEconnect that you may have!

From a command shell, change to the demo working folder and execute the command:

##### Windows
`scripts\import.bat`

##### *nix
`./scripts/import.sh`

## Start the project
From a command shell, change to the demo working folder and execute the following command:

`npm start`

From another command shell, change to the Project-Evolution working folder and execute the following command:

`npm start`


## Update the "hosts" file to add "DNS" support for company context
There are 3 mock Companies: SS, CC, and ACME

The exact location of the file varies by operating system

Ensure these entries are present:

```
127.0.0.1 ss.localhost
127.0.0.1 cc.localhost
127.0.0.1 acme.localhost
```

## Browse to the page

From either a desktop or mobile browser

`http://<COMPANY>.localhost:9000/product/permissiondemo`

Substitute one of the mock company codes for <COMPANY>.

`http://cc.localhost:9000/product/permissiondemo`

(Substitute the DNS name or IP address for localhost when browsing from a mobile device)

### To view different permission settings
Logon as a different user: all user passwords are "go"

* Company cc / User ccuser
* Company ss / User ssuser
* Company acme / User acuser

