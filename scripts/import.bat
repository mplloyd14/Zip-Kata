@echo off
cls
rem mongo/bin must be in path
setlocal
set BASE_DIR=%~dp0
set server=%1%
if "%server%" == "" (
    @echo default server to localhost
    set server=localhost
)
@echo Importing to %server%

@echo Importing Product definitions...
mongoimport -h %server% --port 27017 -d evolution -c productDefinitions --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\productDefinitions.json"

@echo Importing Companies...
mongoimport -h %server% --port 27017 -d evolution -c companies --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\companies.json"

@echo Importing Users...
mongoimport -h %server% --port 27017 -d evolution -c users --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\users.json"
