@echo off
cls
rem mongo/bin must be in path
set BASE_DIR=%~dp0
set server=%1%
if "%server%" == "" (
    set server=localhost
)    

@echo Importing Product definitions...
mongoimport -h %server% --port 27017 -d mobileconnect -c productDefinitions --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\productDefinitions.json"

@echo Importing Companies...
mongoimport -h %server% --port 27017 -d mobileconnect -c companies --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\companies.json"

@echo Loading users...
mongoimport -h %server% --port 27017 -d mobileconnect -c users --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\users.json"
