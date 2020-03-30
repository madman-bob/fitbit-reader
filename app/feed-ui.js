function truncate(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substr(0, maxLength - 3) + "...";
}

export default class FeedUI {
    constructor(document) {
        this.statusText = document.getElementById("status");
        this.itemListUI = document.getElementById("itemListUI");
        this.itemUIs = this.itemListUI.getElementsByClassName("item");

        this.updateUI();
    }

    updateUI(items) {
        if (items && items.length) {
            this.updateItems(items);

            this.itemListUI.style.display = "inline";
            this.statusText.style.display = "none";

            this.statusText.getElementById("header").text = "";
            this.statusText.getElementById("copy").text = "";
        } else {
            this.itemListUI.style.display = "none";
            this.statusText.style.display = "inline";

            if (items) {
                this.statusText.getElementById("header").text =
                    "No feeds available";
                this.statusText.getElementById("copy").text =
                    "Add feeds to the Reader settings app on your phone, and sync, to start reading.";
            } else {
                this.statusText.getElementById("header").text = "Loading...";
                this.statusText.getElementById("copy").text = "";
            }
        }
    }

    updateItems(items) {
        for (let i = 0; i < this.itemUIs.length; i++) {
            setTimeout(this.updateItem, 0, this.itemUIs[i], items[i]);
        }
    }

    updateItem(itemUI, item) {
        if (!item) {
            itemUI.style.display = "none";
            return;
        }

        itemUI.getElementById("header").text = truncate(item.title, 128);
        itemUI.getElementById("copy").text = truncate(item.description, 256);

        itemUI.style.display = "inline";
    }
}
