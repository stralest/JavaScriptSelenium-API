'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class HomePage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    } 

    bugList = By.xpath('//*[@class="row" and contains(., "ORDER YOUR BUGS TODAY")]');
    registerLink = By.linkText('Register');
    alertText = By.className('alert alert-success');
    quantityDropDown = By.name('quantity');
    quantityOption = By.css('option');
    orderButton = By.className('btn btn-primary');
    shoppingCart = By.partialLinkText('shopping cart');

    getBugListDiv() {
        return this.#driver.findElement(this.bugList);
    }

    async clickOnRegisterLink() {
        const registerLink = await this.#driver.findElement(this.registerLink);
        await registerLink.click();
    }

    getSuccesssAlertText() {
        return this.#driver.findElement(this.alertText);
    }

    getPackageDiv(title) {
        const xpathPackage = `//h3[contains(text(), "${title}")]/ancestor::div[contains(@class, "panel")]`;
        return this.#driver.findElement(By.xpath(xpathPackage));
    }

    getQuantityDropdown(packageDiv) {
        return packageDiv.findElement(this.quantityDropDown)
    }

    getQuantityOptions(quantityDropdown) {
        return quantityDropdown.findElements(this.quantityOption);
    }

    getOrderButton(packageDiv) {
        return packageDiv.findElement(this.orderButton);
    }

    async clickOnViewShoppingCartLink() {
        const linkShoppingCart = await this.#driver.findElement(this.shoppingCart);
        await linkShoppingCart.click();
    }
}
