import chai from 'chai';
var expect = chai.expect;

import EventBus from '../src/event-bus';

describe('EventBus', () => {
	let eventBus;

	beforeEach(() => {
		eventBus = new EventBus();
	});

	it('should call one handler when an action is fired', (done) => {
        eventBus.on('one', () => {
            done();
        });
        eventBus.emit('one');

	});

	it('supports Symbols', (done) => {
	    const one = Symbol('one');
        eventBus.on(one, () => {
            done();
        });
        eventBus.emit(one);

	});

	it('should call multiple handler when an action is fired', () => {
	    let counter = 0;
        eventBus.on('two', () => {
            counter++;
        });
        eventBus.on('two', () => {
            counter++;
        });

        eventBus.emit('two');
        eventBus.emit('two');

        expect(counter).to.equal(4);
	});

	it('should call action handler(s) with one parameter', () => {
        eventBus.on('echo', (str) => {
            expect(str).to.equal('hello world');
        });

        eventBus.emit('echo', 'hello world');

	});

	it('should call the action handler with multiple parameters', () => {
        eventBus.on('log', function() {
            expect(arguments.length).to.equal(3);
            expect(arguments[0]).to.equal('hello');
            expect(arguments[1]).to.equal('world');
            expect(arguments[2]).to.equal('!');
        });

        eventBus.emit('log', 'hello', 'world', '!');
	});

	it('should allow to specify a custom context object', () => {
	    const obj = {
	        counter: 0,
	        method() {
	            this.counter++;
            }
        };

        eventBus.on('log', obj.method, obj);

        eventBus.emit('log');
        eventBus.emit('log');

        expect(obj.counter).to.equal(2);
	});

	it('should allow to unsubscribe from an event', () => {
	    let counter = 0;

        const handler = () => {counter++};

        eventBus.on('log', handler);

        eventBus.emit('log');

        eventBus.off('log', handler);

        eventBus.emit('log');

        expect(counter).to.equal(1);
	});

	it('should allow to unsubscribe from an event, specifying a context object', () => {
        const obj = {
            counter: 0,
            method() {
                this.counter++;
            }
        };

        eventBus.on('log', obj.method, obj);

        eventBus.emit('log');

        eventBus.off('log', obj.method, obj);

        eventBus.emit('log');

        expect(obj.counter).to.equal(1);
	});

	it('should prevent action handlers to be subscribed to a specified event more than once', () => {
        const obj = {
            counter: 0,
            method() {
                this.counter++;
            }
        };

        eventBus.on('log', obj.method, obj);
        eventBus.on('log', obj.method, obj);

        eventBus.emit('log');
        eventBus.emit('log');

        expect(obj.counter).to.equal(2);
	});
});
