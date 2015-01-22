Project-Evolution Permission Demo
======================

This simple demonstration presents role and permission based content and data delivery: the markup and/or data presented is determined by the particular role and/or permissions
associated with the logged on user. Additionally, role based control of routes is also presented.

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


## Browse to the restricted page

From either a desktop or mobile browser

`http://<COMPANY>.localhost:9000/product/permissiondemo/restricted`

Substitute one of the mock company codes for <COMPANY>.

`http://cc.localhost:9000/product/permissiondemo/restricted`

(Substitute the DNS name or IP address for localhost when browsing from a mobile device)

### To view different permission settings
Logon as a different user: all user passwords are "go"

* Company cc / User ccuser
* Company ss / User ssuser
* Company acme / User aauser
* Company acme / User acuser

# NOTE: Restricted Routes and Client Side Navigation

Check out the client side navigation for the "restricted view".

Logon as acme/aauser and it's possible to click a link that will navigate on the client to a restricted view.

Logon as acme/acuser and the link is not present.

Now, using IE, logon as acme/aauser, copy the link from the browser navigation bar. Using Chrome login as acme/acuser, paste the previously copied link into the browser navigation bar and load the page.

The server does process the reload request and deliver a page.

But, looking at the routes.js, the route for our restricted page is protected and limited to the roleA role. Why did the server return the page instead of responding with a 401/Unauthorized status?

For older browsers like IE9 angularjs uses #! to perform client side navigation (tricking the browser). When a URI with the #! in the path is 'reloaded' in a "new" browser, the browser actually only sends the URI portion to the left of the #, not the full client path.

The effect is that the server only receives a portion of the path and matches it's routes accordingly; in this case it matches on a route that is not protected by a role and therefore delivers the page.

The saving grace is the use of role based content delivery to ensure that no unauthorized content is delivered to the browser, regardless of the route used to deliver the SPA.

