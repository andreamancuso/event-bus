class EventBus {
    constructor() {
        this.handlers = {};
    }

    on(eventName, handler) {
        this.handlers[eventName] = this.handlers[eventName] || [];
        this.handlers[eventName].push(handler);
    }

    emit(eventName, ...args) {
        if (typeof this.handlers[eventName] !== 'undefined') {
            this.handlers[eventName].forEach(handler => handler.apply(null, args));
        }
    }
}

export default EventBus;
