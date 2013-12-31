@echo off

REM Windows script for running all tests
REM You have to run server for e2e tests
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Mocha (npm install -g mocha)
REM - Karma (npm install -g karma)
REM - Protractor (npm install -g Protractor)
REM - Selenium (https://code.google.com/p/selenium/downloads/list)
REM - Java JRE
REM - ChromeDriver (http://code.google.com/p/chromedriver/downloads/list)

cls
set BASE_DIR=%~dp0

@echo.
@echo Running all tests...
@echo -------------------------------------------------------------------


@echo Running server tests...
node "%BASE_DIR%\..\node_modules\mocha\bin\mocha" -R xunit "%BASE_DIR%\..\test\unit\server" --globals "NODE_CONFIG,exportscoffeeScript" > "%BASE_DIR%\..\test\out\unit_server.xml"

@echo Running client tests...
node "%BASE_DIR%\..\node_modules\karma\bin\karma" start "%BASE_DIR%\..\test\config\karma.conf.js" %*

@echo Running e2e tests...
node "%BASE_DIR%\..\node_modules\protractor\bin\protractor" "%BASE_DIR%\..\test\config\protractor.conf.js" %*

@echo all test suites complete
@echo -------------------------------------------------------------------
