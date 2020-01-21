import { me } from "appbit";

import { fileCache } from "../common/cache";
import Watcher from "../common/watcher";
import FeedQueue from "../common/feed-queue";

import messages from "./messages";

let feedsRaw = fileCache("feeds.json");
feedsRaw.items = new FeedQueue(feedsRaw.items, 10);

let feeds = new Watcher(feedsRaw);

messages.on("feed-item", item => {
    feedsRaw.items.push(item);
    feeds.emit("items");
});

me.addEventListener("unload", () => {
    feedsRaw.save();
});

export default feeds;
