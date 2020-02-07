import { settingsStorage } from "settings";

let feedUrls = JSON.parse(settingsStorage.getItem("feedUrls")).map(
    item => item.name
);

export default feedUrls;
