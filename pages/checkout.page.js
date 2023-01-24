'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class CheckoutPage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }
    getCheckoutSuccessTitle() {
        return this.#driver.findElement(By.css('h2'));
    }
}