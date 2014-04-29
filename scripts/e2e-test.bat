@echo off

REM Windows script for running client e2e tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Protractor (npm install -g Protractor)
REM - Selenium (https://code.google.com/p/selenium/downloads/list)
REM - Java JRE
REM - ChromeDriver (http://code.google.com/p/chromedriver/downloads/list)
set BASE_DIR=%~dp0

cls
node "%BASE_DIR%\..\node_modules\protractor\bin\protractor" "%BASE_DIR%\..\test\config\protractor-dev.conf.js" %*

@echo Concatenating Test Suite Files
SET timeStamp=%date:~-10,2%%date:~-7,2%%date:~-4,4%_%time:~0,2%%time:~3,2%%time:~6,2%
copy /b "%BASE_DIR%\..\test\out\TEST-*.xml" "%BASE_DIR%\..\test\out\e2e_TestResults_%timeStamp%.xml"

@echo Destroying leftover instances of chromedriver.exe
taskkill /F /IM chromedriver.exe


@echo e2e test suite complete




