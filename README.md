#Emitters

Show examples of using |URL|, |PATH_BEG|, and |*|

###REST Services

Establishes 4 REST listeners

- /test
- /test/id/:id
- /test/id/:id/vendor/:vendor
- /test/broadcast

When an POST comes in to one of the routes, an event is fired on the Project Evo message bus.  The follow table should the routes and their events.

| Route | Event |
| ------ | ------ |
| /test | urlReceived |
| /test/id/:id | pathBegReceived |
| /test/id/:id/vendor/:vendor | pathBegReceived |
| /test/broadcast | broadcastReceived |  



