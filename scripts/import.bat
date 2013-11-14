@echo off
cls
rem mongo/bin must be in path
set BASE_DIR=%~dp0

@echo Importing Product definitions...
mongoimport -h localhost --port 27017 -d project-evolution -c productDefinitions --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\evoProductDefinitions.json"

@echo Importing Product instances...
mongoimport -h localhost --port 27017 -d project-evolution -c productInstances --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\evoProductInstances.json"

@echo Loading users...
node "%BASE_DIR%\..\..\Project-Evolution\test\util\seed_users.js" "%BASE_DIR%\..\data\evoUsers.json"

@echo Importing Customers...
mongoimport -h localhost --port 27017 -d project-evolution -c customers --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\data\evoCustomers.json"