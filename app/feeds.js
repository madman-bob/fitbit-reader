import { fileCache } from "../common/cache";
import Watcher from "../common/watcher";

let feedsRaw = fileCache("feeds.json");
feedsRaw.items = feedsRaw.items || [];

let feeds = new Watcher(feedsRaw);

export default feeds;
