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
            this.statusText.text = "";
        } else {
            this.itemListUI.style.display = "none";
            this.statusText.text = "Loading...";
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

        itemUI.getElementById("header").text = item.title;
        itemUI.getElementById("copy").text = item.description;

        itemUI.style.display = "inline";
    }
}
