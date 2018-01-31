class EventBus {
    constructor() {
        this.handlers = {};
    }

    /**
     * Allows one or more functions (action handlers) to be attached to named events (actions) emitted by the object.
     * Event names can be any valid JavaScript property. An optional context object can be specified.
     *
     * @param {String|Symbol} eventName
     * @param {Function} handler
     * @param {Object|undefined} context (optional)
     */
    on(eventName, handler, context = null) {
        this.handlers[eventName] = this.handlers[eventName] || [];

        const matchedHandler = this.handlers[eventName].find(handlerObj =>
            handlerObj.handler === handler && handlerObj.context === context
        );

        if (typeof matchedHandler === 'undefined') {
            this.handlers[eventName].push({
                handler, context
            });
        }
    }

    /**
     * Allows to unsubscribe action handlers from specific events. This takes into account the context the object.
     *
     * @param {String|Symbol} eventName
     * @param {Function} handler
     * @param {Object|undefined} context (optional)
     */
    off(eventName, handler, context = null) {
        this.handlers[eventName] = this.handlers[eventName].filter((handlerObj) =>
            handlerObj.handler !== handler || handlerObj.context !== context);
    }

    /**
     * The broker will invoke any action handlers currently subscribed to the specified event name.
     * Any arguments received will be forwarded to the action handlers.
     *
     * @param {String|Symbol} eventName
     * @param {...Array} args
     */
    emit(eventName, ...args) {
        if (typeof this.handlers[eventName] !== 'undefined') {
            this.handlers[eventName].forEach(({handler, context}) =>
                handler.apply(context, args));
        }
    }
}

export default EventBus;
