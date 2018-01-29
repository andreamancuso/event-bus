# EventBus basic library

This library is an implementation of the Pub/Sub pattern (basic, synchronous implementation). 

Instances of the EventBus (brokers) can be used as follows:

`eventBus.on('eventName', function() {})`

Allows one or more functions (action handlers) to be attached to named events (actions) emitted by the object. Event names can be any valid JavaScript property.

`eventBus.emit('eventName')`

The broker will invoke any action handlers currently subscribed to the specified event name. Any arguments received will be forwarded to the action handlers.

Example:

```
const eventBus = new EventBus();

eventBus.on('log', function() {
    console.log(...arguments); // Prints 'hello world !'
});

eventBus.emit('log', 'hello', 'world', '!');
```
