import moment from "moment";
import { DOMParser } from "xmldom";

let array = arrayLike => Array.prototype.slice.call(arrayLike || []);
let find = (arrayLike, func) => array(arrayLike).find(func);
let filter = (arrayLike, func) => array(arrayLike).filter(func);

function fromEntries(entries) {
    let obj = {};
    for (let entry of entries) {
        obj[entry[0]] = entry[1];
    }
    return obj;
}

function xml2json(xml) {
    if (!xml) {
        return xml;
    } else if (xml.nodeName == "#text" || xml.nodeName == "#cdata-section") {
        return xml.data;
    } else {
        return fromEntries(
            array(xml.childNodes)
                .filter(prop => prop.nodeName && prop.childNodes)
                .map(prop => [prop.nodeName, xml2json(prop.childNodes[0])])
        );
    }
}

let nodeNameFilter = name => node => node.nodeName == name;

function rssItems(xml) {
    let rss = find(xml.childNodes, nodeNameFilter("rss")) || {};
    let channel = find(rss.childNodes, nodeNameFilter("channel")) || {};
    let items = filter(channel.childNodes, nodeNameFilter("item"));

    return items.map(xml2json).map(item => ({
        guid: item.guid,
        title: item.title,
        description: item.description,
        date: moment.parseZone(item.pubDate)
    }));
}

function atomItems(xml) {
    let feed = find(xml.childNodes, nodeNameFilter("feed")) || {};
    let items = filter(feed.childNodes, nodeNameFilter("entry"));

    return items.map(xml2json).map(item => ({
        guid: item.id,
        title: item.title,
        description: item.summary || "",
        date: moment.parseZone(item.updated)
    }));
}

let domParser = new DOMParser();

function fetchDOM(url) {
    // A little weird, but for some reason doesn't work without the outer Promise
    return new Promise((resolve, reject) =>
        fetch(url)
            .then(response => response.text())
            .then(text => domParser.parseFromString(text, "text/xml"))
            .then(resolve, reject)
    );
}

export default function fetchFeedItems(url) {
    return fetchDOM(url).then(dom => rssItems(dom).concat(atomItems(dom)));
}
