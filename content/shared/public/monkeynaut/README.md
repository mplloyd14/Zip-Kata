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
I18n angular services will be inserted by project-evolution server and reference files stored in `monkeynaut/dist/js/i18n/`.
***vendor-core.pkg.js***

Required third-party libraries.

* base64 Encoder
* primus *(configured to work with project-evolution server)*
* angular v1.3.15
* angular-route v1.3.15
* angular-cookies v1.3.15
* angular-sanitize v1.3.15
* angular-touch v1.3.15
* angular-18n v1.3.15
* moment v2.9.0
* i18n-node-angular

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

#### Changelog**

Moved all client side content out of project-evolution and into [monkeynaut](https://github.com/CommandAlkon/monkeynaut). To add new changes to old projects the following changes will need to be made.


**Breaking Changes:**

* v0.9.1
	* All references to *cai* will need to be removed or changed.
	* The *cai.services* module does not exist and had been renamed to *evo*.
	* Re-usable Command Alkon angular components are not part of core services. They can be included by using `projevo-full.min.js` and referencing *evo.common* in  required array of main module.
    * Default Command Alkon branding font, and class styles can be applied using the .cai-titillium-font and cai-link class.


Table below list all the module names that will need to change if a developer chooses to use this package with an older Command Alkon project.

| **Old Module**  | **New Module**    |
|-------------------------|-----------------------------|
| User                       | evoUser                      |
| Core                       | evoClientData           |
| Config                    | evoConfig                   |
| Templates            | evoTemplates<sup>1</sup> |
| apiProvider           | evoAPI                         |
| Validation              | evoValidation            |
| Utils                        | evoUtils                      |
| Browser                 | evoBrowser              |

<sup>1.</sup> Templates service method to cache templates has renamed to cacheTemplates from defaultMissingTemplates.
