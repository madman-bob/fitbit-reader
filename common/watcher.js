import EventEmitter from "events/events";

export default class Watcher extends EventEmitter {
    constructor(item) {
        super();
        this.item = item;
    }

    on(key, func) {
        func(this.item[key]);
        super.on(key, func);
    }

    emit(key) {
        super.emit(key, this.item[key]);
    }

    change(key, value) {
        this.item[key] = value;
        this.emit(key);
    }
}
