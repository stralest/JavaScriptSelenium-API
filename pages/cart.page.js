'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class CartPage extends BasePage{
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }

    getPageHeaderTitle() {
        return this.#driver.findElement(By.css('h1'));
    }

    getCartTable() {
        return this.#driver.findElement(By.css('table'));
    }

    getOrderRow(packageName) {
        const xpathOrderRow = `//td[contains(., "${packageName}")]/parent::tr`;
        return this.getCartTable().findElement(By.xpath(xpathOrderRow));
    }

    getItemQuantity(orderRow) {
        return orderRow.findElement(By.xpath('td[2]'));
    }

    getItemPrice(orderRow) {
        return orderRow.findElement(By.xpath('td[3]'));
    }

    getItemPriceTotal(orderRow) {
        return orderRow.findElement(By.xpath('td[4]'));
    }

    async clickOnCheckoutButton() {
        const checkoutButton = await this.#driver.findElement(By.name('checkout'));
        await checkoutButton.click();
    }
}