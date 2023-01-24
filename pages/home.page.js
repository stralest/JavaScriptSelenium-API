'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class HomePage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }

    getWelcomeBackTitle() {
        return this.#driver.findElement(By.css('h2'));
    }    

    getBugListDiv() {
        return this.#driver.findElement(By.xpath('//*[@class="row" and contains(., "ORDER YOUR BUGS TODAY")]'));
    }

    async clickOnRegisterLink() {
        const registerLink = await this.#driver.findElement(By.linkText('Register'));
        await registerLink.click();
    }

    getSuccesssAlertText() {
        return this.#driver.findElement(By.className('alert alert-success'));
    }

    getPackageDiv(title) {
        const xpathPackage = `//h3[contains(text(), "${title}")]/ancestor::div[contains(@class, "panel")]`;
        return this.#driver.findElement(By.xpath(xpathPackage));
    }

    getQuantityDropdown(packageDiv) {
        return packageDiv.findElement(By.name('quantity'))
    }

    getQuantityOptions(quantityDropdown) {
        return quantityDropdown.findElements(By.css('option'));
    }

    getOrderButton(packageDiv) {
        return packageDiv.findElement(By.className('btn btn-primary'));
    }

    async clickOnViewShoppingCartLink() {
        const linkShoppingCart = await this.#driver.findElement(By.partialLinkText('shopping cart'));
        await linkShoppingCart.click();
    }
}
