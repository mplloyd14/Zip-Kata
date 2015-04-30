Monkeynaut
----------
> There's a lot of space out there to get lost in.
> &mdash;*John Robinson*

Monkeynaut is a package of vendor libraries and core services that are required for the development of Command Alkon web-applications.


#### Getting Started

1. Install bower `npm install -g bower` and create a `.bowerrc` file with the following content in root of project directory.

    ``` JSON
    {
       "directory": "path/to/shared/directory"
    }
    ```
2. `bower install git@github.com:CommandAlkon/monkeynaut.git`

#### Package Content

All the content listed below will be installed in the directory specified in the `.bowerrc` file.

```
dist/
├── css
│   ├── projevo-core.pkg.css
│   └── projevo-ionic.pkg.css
├── fonts
│   ├── ionicons.eot
│   ├── ionicons.svg
│   ├── ionicons.ttf
│   └── ionicons.woff
├── js
│   ├── projevo-core.js
│   ├── projevo-core.pkg.js
│   ├── projevo-full.js
│   ├── projevo-full.pkg.js
│   └── projevo-ionic.pkg.js
└── vendor
    ├── angular
    ├── angular-animate
    ├── angular-bootstrap
    ├── angular-cookies
    ├── angular-mocks
    ├── angular-route
    ├── angular-sanitize
    ├── angular-touch
    ├── angular-ui-router
    ├── base64.js
    ├── bootstrap
    ├── i18n-node-angular.js
    ├── ionic
    ├── jquery
    ├── moment
    └── primus
```

***projevo-core.pkg.js***

Core servies and third-party libraries required to build mobile and/or desktop web-application.

* base64 encode/decode
* i18n-node-angular
* angular v1.3.15
* angular-cookies v1.3.15
* angular-animate v1.3.15
* angular-route v1.3.15
* angular-touch v1.3.15
* angular-sanitize v1.3.15
* moment v2.9.0
* monkeynaut v0.9.1 *(Core services only.)*

***projevo-full.pkg.js***

Core services and re-usable monkeynaut angular components.

* projevo-core.pkg.js
* angular-bootstrap v0.12.1
* monkeynaut v0.9.1 *(Core services and re-usable components.)*

***projevo-ionic.js***

Core services packaged with ionic angular components.

* projevo-core.pkg.js
* ionic v1.0.0-rc.5
