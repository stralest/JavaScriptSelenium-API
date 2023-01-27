'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class CheckoutPage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }

    goBackToSite = By.linkText("Go back to the site.");

    async clickOnGoBackToSiteButton(){
        const btn = await this.#driver.findElement(this.goBackToSite);
        await btn.click();
    } 
}