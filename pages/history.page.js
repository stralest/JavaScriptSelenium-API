'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class HistoryPage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }
    getHistoryTable() {
        return this.#driver.findElement(By.css('table'));
    }

    getHistoryRow(orderNum) {
        const xpathHistoryRow = `//td[contains(., "#${orderNum}")]/parent::tr`;
        return this.getHistoryTable().findElement(By.xpath(xpathHistoryRow));
    }

    getHistoryStatus(orderRow) {
        return orderRow.findElement(By.className('status'));
    }
}