import EventEmitter from "events/events";

export default asap => {
    let messages = new EventEmitter();

    asap.onmessage = message => {
        messages.emit(message.key, message.value && JSON.parse(message.value));
    };

    return {
        on: (key, callback) => {
            messages.on(key, callback);
        },
        emit: (key, value) => {
            asap.send({
                key: key,
                value: JSON.stringify(value)
            });
        }
    };
};
