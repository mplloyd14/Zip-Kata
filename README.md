#Background

This peseed shows examples of using |URL|, |PATH_BEG|, and |*| emitters.  It also discourses on how data enters EVO and makes it to the emitters.

###REST Services

Establishing REST services allows an application to create a REST API so it can receive data from external sources.  This example application establishes 4 REST services.

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


###Socket Services

Socket Services create listeners that will answer call from Angular Services and Controlled in EVO apps.  This example establishes 3 handlers.

* createPathBegRoom
* createVendorRoom
* createUrlRoom

Each handler creates a room upon being called.  Rooms aggregate clients who want to be notified about data.  Each use |URL| for it's room id.  This means
that the url declared in the "url" property will be inflated with the values passed into the handler by the javascript call on the frontend.  The subsequent url
will then become the unique id of the room.  The "announce" setting on the room is set to false so that the room's
creation and destruction will not be announced on the event bus.  Finally, the room created by the "createVendorRoom" is marked as "exactMatch : true".  This means
that the room will not allow events to be passed to it's members unless the source url of the information is the same as the room's id.

###Emitters

The job  of an emitter is to send messages to clients in rooms.  To do this you need to tell the emitter which event on the event bus that it needs to listen for.
This is done by setting the "event" property.  Once the event is received from the bus, it uses the "room" property to determine if the information should be passed to
the room.  Setting the room property to "|URL|" means that the source url of the data (the url upon which the REST service received the data) must exactly match the id of
the room (created when data is passed to a handler that has a "room" property with it's id value set to "|URL|").  Setting the property to "|*|"  means that any client in
any room will receive the message.  In short it broadcasts to all connected clients.  Setting the property "|PATH_BEG|" means that the source url of the data should be
put into the pattern defined in the "pattern" property.  The pattern will then be inflated using the values from the source url.  For example if a pattern of "test/{id}"
is inflated using a source url of "/test/id/7" then the id of "7" is extracted from the source url and applied to the pattern.  This yields "/test/id/7".  So rooms ids are searched
and anyone beginning with "/test/id/7" will be a match. While this contrived example may seems obvious, note that if the source url had been "/material/sand/location/west/truck/id/7" the
value of "7" for id would still have been extracted and used to inflate the pattern.  The result would still be "/test/id/7".


###Creating the rooms via the UI
When the Angular front end calls one of the websocket handlers in the SocketProvider, if the handler is configured to create a room it will do so.  If the rooms "id" field is set to "|URL|" then the pattern
in the "url" field is inflated with the values passed into the handler.  For example, if { id : 7, vendor : "abc" } were passed into a handler configured with the following room, the pattern would be inflated
to "/test/id/7/vendor/abc".  This would then become the room's id.

```javascript
room: {
                id: "|URL|",
                client: true,
                url: "/test/{id}/{vendor}",
                announce: false
            }
```


###Receiving emitted events in Angular

Every event listed in the emitter declaration must have corresponding code in Angular to receive the event.  Code in either a controller or service must listen for the event on
rootScope.  Below is an example.


```javascript
 $rootScope.$on("urlReceived", function (event, message) {
            console.log("Event urlReceived fired with : " + message);
        });
```


#Running the example

Start the server.  In a browser navagate to http://localhost:4000/.  Using either another profile on that browser or another browser again go to http://localhost:4000/.  Open the Javascript console
on both browsers. In one browser click the "Create Test Room" button and the "Create Test/id" button.  In the other browser click the "Create Test/id/vendor" button.  Using a REST client post to the following routes.
Looking in the Javascript console keep track of which which routes fire upon each post.

http://localhost:4001/company/cai/product/emitters/test
http://localhost:4001/company/cai/product/emitters/test/id/7
http://localhost:4001/company/cai/product/emitters/test/id/7/vendor/abc
http://localhost:4001/company/cai/product/emitters/test/broadcast


#Understanding the example
In order to understand the example, think about the following questions.  Based on the overview, does it make sense which emitters fired each time?  Notice that both of the routes "/test/id/7" and "/test/id/7/vendor/abc"
fired in browser where you created the "Test/id Room" but only "/test/id/7/vendor/abc" caused the event to fire in the "Test/id/vendor" room.  Since both rooms are marked |PATH_BEG|, why didn't they both receive two events?
When you opened the page and created rooms, you did not create one for the broadcast events yet they reached the browser.  Why?





