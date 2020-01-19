import document from "document";

import feeds from "./feeds";
import FeedUI from "./feed-ui";

let feedUI = new FeedUI(document);

feeds.on("items", items => {
    feedUI.updateUI(items);
});
