'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class CartPage extends BasePage{
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }
    
    checkoutButton = By.name('checkout');
    itemQuantity = By.xpath('td[2]');
    pricePerItem = By.xpath('td[3]');
    itemTotalPrice = By.xpath('td[4]');

    getOrderRow(packageName) {
        const xpathOrderRow = `//td[contains(., "${packageName}")]/parent::tr`;
        return this.getTable().findElement(By.xpath(xpathOrderRow));
    }

    getItemQuantity(orderRow) {
        return orderRow.findElement(this.itemQuantity);
    }

    getItemPricePerItem(orderRow) {
        return orderRow.findElement(this.pricePerItem);
    }

    getItemPriceTotal(orderRow) {
        return orderRow.findElement(this.itemTotalPrice);
    }

    async clickOnCheckoutButton() {
        const checkoutButton = await this.#driver.findElement(this.checkoutButton);
        await checkoutButton.click();
    }
}