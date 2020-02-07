import fetchFeedItems from "../common/feeds";

import messages from "./messages";
import feedUrls from "./feeds";

messages.on("request-feeds", () => {
    feedUrls.forEach(url =>
        fetchFeedItems(url).then(items =>
            items.forEach(item => messages.emit("feed-item", item))
        )
    );
});
