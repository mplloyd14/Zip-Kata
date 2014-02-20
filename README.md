MOBILEconnect Style Guide
=========================

The repo represents a sample branded application

# Help and Demonstration
The site is running on the development server at caidublin.com.

## Browse the site
The site is unsecured, so no login is necessary. Simply point a browser at a url.

For Spacely Sprockets
```
http://ss.caidublin.com/product/styleguide
```

For Cogswell Cogs
```
http://cc.caidublin.com/product/styleguide
```

For ACME
```
http://ac.caidublin.com/product/styleguide
```

# Working with the Code

Clone the repo.

DO NOT WORK DIRECTLY AGAINST THIS REPO! DO NOT COMMIT OR PUSH ANY CHANGES TO THIS REPO UNLESS AUTHORIZED!

Switch to the sample app branch. From a git shell, change to the repo working folder and execute the command:

`git checkout styleguide`

## Install Dependencies

From a git shell, change to the repo working folder and execute the command:

`npm install`

## Seed Data
The seed data is located in the data/ sub-folder. It consists of 3 fictitious companies.

* Spacely Sprockets
    * ss
* Cogswell Cogs
    * cc
* ACME Conglomerated
    * ac

Each company has a different set of branding information (and ACME has no logo).

### Load the seed data
Run the following commands to load the data

#### windows
```
data\import.bat
```

#### *nix
```
data/import.bat
```

## Configuration
The default settings are largely acceptable.

The Web server port is set to 6100.

### Customizations
Override the default assets path. Company branding assets, such as logos, will be stored in a common area.

To simulate this, create a folder elsewhere in your file system and supply a configuration that location.

For example, when running in development mode, create a file named development.js and place it in the config/ folder under the repo working folder.

```
module.exports = {
    paths: {
        static: {
            assets: '/path/to/your/common/assets'
        }
    }
};
```

Company branding assets will be served from that folder. The convention is to create folders under the common assets folder for each company, corresponding to the company code.

For example, for Spacely Sprockets, the company code is "ss", so the common asset folder would contain a sub-folder named ss/.

Within a company asset folder, images are by convention assumed to be within a sub-folder named img/.

For Spacely Sprockets, the logo file would be located:
```
/path/to/your/common/assets/ss/img/spacley-logo-png
```

## Start the project
From a command shell, execute the following command:

`npm start`

## Browse the site
The site is unsecured, so no login is necessary. Simply point a browser at a url.

For Spacely Sprockets
```
http://ss.localhost:6100/product/styleguide
```

For Cogswell Cogs
```
http://cc.localhost:6100/product/styleguide
```

For ACME
```
http://ac.localhost:6100/product/styleguide
```
