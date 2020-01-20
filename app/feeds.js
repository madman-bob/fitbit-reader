import { fileCache } from "../common/cache";
import Watcher from "../common/watcher";
import FeedQueue from "../common/feed-queue";

let feedsRaw = fileCache("feeds.json");
feedsRaw.items = new FeedQueue(feedsRaw.items, 10);

let feeds = new Watcher(feedsRaw);

export default feeds;
