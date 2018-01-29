class EventBus {
    constructor() {
        this.handlers = {};
    }

    /**
     * @param {String|Symbol} eventName
     * @param {Function} handler
     */
    on(eventName, handler) {
        this.handlers[eventName] = this.handlers[eventName] || [];
        this.handlers[eventName].push(handler);
    }

    /**
     * @param {String|Symbol} eventName
     * @param {...Array} args
     */
    emit(eventName, ...args) {
        if (typeof this.handlers[eventName] !== 'undefined') {
            this.handlers[eventName].forEach(handler => handler.apply(null, args));
        }
    }
}

export default EventBus;
