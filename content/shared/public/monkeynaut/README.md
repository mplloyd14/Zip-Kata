Monkeynaut
----------
> There's a lot of space out there to get lost in.
> &mdash;*John Robinson*

Monkeynaut is a package of third-party libraries and core services that are required for the development of Command Alkon web-applications.

#### Dependencies

* bower 1.4.1
* grunt 0.4.5
* node 0.10.25
* npm 1.3.10

#### Getting Started

1. Install bower `npm install -g bower` and create a `.bowerrc` file with the following content in root of project directory.

    ``` JSON
    {
       "directory": "path/to/shared/directory"
    }
    ```
2. `bower install git@github.com:CommandAlkon/monkeynaut.git`
3. Include monkeynaut scripts in `layout.jade`. *(Example below)*
3. Add *evo* and *evo.common* to your angular required array.

    ``` Javascript
    angular.module("productCode", ["ngRoute", "evo", "evo.common"]);
    ```

**layout.jade file.**

``` Jade
!!!
html(ng-app="demo")
  head
    meta(charset="utf8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")

    title #{title}

    link(rel="stylesheet", href="#{config.appBase}/shared/monkeynaut/dist/css/projevo-core.pkg.css")
    include /core/shared/branding
    link(rel="stylesheet", href="#{config.appBase}/web/css/app.css")
  body(i18n-locale=i18n.getLocale())
    script(src="#{config.appBase}/shared/monkeynaut/dist/js/bundle-full.min.js")
    include /core/shared/scripts
    block body
```

**Package Contents:**

All the content of monkeynaut will be installed in the directory specified in the `.bowerrc` file.

```
dist/
├── css
│   ├── projevo-core.pkg.css
│   └── projevo.min.css
├── fonts
│   ├── glyphicons-halflings-regular.eot
│   ├── glyphicons-halflings-regular.svg
│   ├── glyphicons-halflings-regular.ttf
│   ├── glyphicons-halflings-regular.woff
│   ├── glyphicons-halflings-regular.woff2
│   ├── ionicons.eot
│   ├── ionicons.svg
│   ├── ionicons.ttf
│   └── ionicons.woff
│   └── titilliumweb.woff
└── js
    ├── bundle-core.js
    ├── bundle-core.min.js
    ├── bundle-full.js
    ├── bundle-full.min.js
    ├── bundle-ionic.js
    ├── bundle-ionic.min.js
    ├── i18n
    │   ├── angular-locale_*.js
    ├── projevo-core.pkg.js
    ├── projevo-core.pkg.min.js
    ├── projevo-full.pkg.js
    ├── projevo-full.pkg.min.js
    ├── projevo-tpls-core.js
    ├── projevo-tpls-full.js
    ├── vendor-core.pkg.js
    ├── vendor-core.pkg.min.js
    ├── vendor-full.pkg.js
    ├── vendor-full.pkg.min.js
    ├── vendor-ionic.pkg.js
    └── vendor-ionic.pkg.min.js
```

All available angular i18n services will be installed in sub-directory `monkeynaut/dist/js/i18n/` and will be referenced by [project-evolution](https://github.com/CommandAlkon/ProjectEvo-Core) dynamically.

***vendor-core.pkg.js***

Required third-party libraries.

* base64 Encoder
* primus<sup>1</sup>
* angular v1.3.15
* angular-route v1.3.15
* angular-cookies v1.3.15
* angular-sanitize v1.3.15
* angular-touch v1.3.15
* angular-18n v1.3.15
* moment v2.9.0
* i18n-node-angular<sup>2</sup>

<sup>1.</sup> Configured to work with [project-evolution](https://github.com/CommandAlkon/ProjectEvo-Core).

<sup>2.</sup> Modified to accept a configurable route prefix so that it can be used in multi-tenant environment at Command Alkon.

***vendor-full.pkg.js***

All libraries included in the vendor-core file with the addition of bootstrap ui components.

* angular-bootstrap

***vendor-ionic.pkg.js***

Third-party libraries included in vendor-core and ionic/ionic-angular.

* ionic v1.0.0-rc.5
* ionic-angular v1.0.0-rc.5

***projevo-core.pkg.js***

Command Alkon core angular services.

* monkeynaut v0.9.1

***projevo-full.pkg.js***

Command Alkon core angular services, and common directives.

* monkeynaut v0.9.1 *(evo.common, evo.templates)*

***bundle-core.js***

Third-party libraries and Command Alkon core angular services.

***bundle-full.js***

Third-party libraries, Command Alkon core angular services, and ui components.

***bundle-ionic.js***

Everything inlcluded in the bundle-core and vendor-ionic files.

#### Changelog

* v0.9.1 *(pre-release)*

  Moved all client side content out of project-evolution and into [monkeynaut](https://github.com/CommandAlkon/monkeynaut). Please review the **breaking changes** information before including this package in any Command Alkon web-application project.

**Breaking Changes:**

1. All references to *cai* will need to be removed or changed.
2. `cai.module` has been renamed to `evo.module`.
2. The *cai.services* has been renamed to *evo*; any references to *cai.services* will not work.
3. Excluding the about directive, a majority of the UI components are not part of core services. They can be included by using `bundle-full.min.js` and adding *evo.common* to angular required array.


| **Old Angular Module**  | **New Angular Module**    |
|-------------------------|---------------------------|
| User                    | evoUser                   |
| Core                    | evoClientData             |
| Config                  | evoConfig                 |
| Templates               | evoTemplates<sup>1</sup>  |
| apiProvider             | evoAPI                    |
| Validation              | evoValidation             |
| Utils                   | evoUtils                  |
| Browser                 | evoBrowser                |

<sup>1.</sup> Templates service method to cache templates has renamed to cacheTemplates from defaultMissingTemplates.
