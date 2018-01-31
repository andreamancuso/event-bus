class EventBus {
    constructor() {
        this.handlers = {};
    }

    /**
     * @param {String|Symbol} eventName
     * @param {Function} handler
     * @param {Object|undefined} context (optional)
     */
    on(eventName, handler, context = null) {
        this.handlers[eventName] = this.handlers[eventName] || [];
        this.handlers[eventName].push({
            handler, context
        });
    }

    /**
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
