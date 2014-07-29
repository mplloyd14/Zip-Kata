@echo off
cls
rem mongo/bin must be in path
set BASE_DIR=%~dp0

@echo Importing Product definitions...
mongoimport -h localhost --port 27017 -d mobileconnect -c productDefinitions --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\productDefinitions.json"

@echo Importing Companies...
mongoimport -h localhost --port 27017 -d mobileconnect -c companies --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\companies.json"

@echo Importing Users...
mongoimport -h localhost --port 27017 -d mobileconnect -c users --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\users.json"


@echo Importing Fubars...
mongoimport -h localhost --port 27017 -d ss -c fubars --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\test\data\fubars.json"
mongoimport -h localhost --port 27017 -d cc -c fubars --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\test\data\fubars.json"
