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

@echo Importing Users...
mongoimport -h %server% --port 27017 -d mobileconnect -c users --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\users.json"


@echo Importing Fubars...
mongoimport -h %server% --port 27017 -d ss -c fubars --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\test\data\fubars.json"
mongoimport -h %server% --port 27017 -d cc -c fubars --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\test\data\fubars.json"

set server=
