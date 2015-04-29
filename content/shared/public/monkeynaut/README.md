monkeynaut
----------
There's a lot of space out there to get lost in.

#### Getting Started

Before getting started make sure to create a `.bowerrc` with the following content.

``` JSON
{
   "directory": "path/to/shared/directory"
}
```

`bower install git@github.com:CommandAlkon/monkeynaut.git`


Bower will install the contents of monkeynaut to the directory specified in the `.bowerrc` file.

```
dist/
├── css
│   ├── projevo-core.pkg.css
│   └── projevo-ionic.pkg.css
├── fonts
│   ├── ionicons.eot
│   ├── ionicons.svg
│   ├── ionicons.ttf
│   └── ionicons.woff
└── js
    ├── projevo-core.pkg.js
    ├── projevo-full.pkg.js
    └── projevo-ionic.pkg.js
```

**Javascript Packages**

* `projevo-core.pkg.js`

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
 * evo v0.9.1 *(Core Command Alkon services)*
* `projevo-full.pkg.js`

 Core services and reusable angular components.
 * `projevo-core.pkg.js`
 * angular-bootstrap v0.12.1
 * evo.common *(Re-usable Command Alkon components)*
* `projevo-ionic.pkg.js`

 Ionic angular components packaged with core services.
 * `projevo-core.pkg.js`
 * ionic v1.0.0-rc.5-nightly-1276


**Stylesheet Packages**

* `projevo-core.pkg.css`
 * Bootstrap v3.3.4
 * evo v0.9.1 *Note: This stylesheet has ng-cloak.*
* `projevo-ionic.pkg.css`
 * ionic v1.0.0-rc.5-nightly-1276
