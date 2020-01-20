import TinyQueue from "tinyqueue/tinyqueue";

let feedItemCompare = (a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0;

export default class FeedQueue extends TinyQueue {
    constructor(data, maxLength) {
        super(data || [], feedItemCompare);
        this.maxLength = maxLength || Infinity;
    }

    findIndex(item) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].guid == item.guid) {
                return i;
            }
        }
        return -1;
    }

    replace(i, item) {
        let originalItem = this.data[i];
        this.data[i] = item;

        if (originalItem.date < item.date) {
            this._up(i);
        } else {
            this._down(i);
        }
    }

    _trim() {
        if (this.length > this.maxLength) {
            this.data.splice(this.maxLength);
            this.length = this.maxLength;
        }
    }

    push(item) {
        let i = this.findIndex(item);

        if (i != -1) {
            this.replace(i, item);
        } else {
            super.push(item);
            this._trim();
        }
    }

    toJSON() {
        return this.data;
    }
}
