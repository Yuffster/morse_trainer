class EventEmitter {
	
	constructor() {
		this.listeners = [];
	}

	on(name, fun) {
		this.listeners[name] = this.listeners[name] || {};
		this.listerers[name].push(fun);
	}

	emit(name, ...args) {
		for (fun of this.listeners[name]) fun.apply(null, args);
	}

}