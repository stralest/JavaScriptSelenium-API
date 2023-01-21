'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class BasePage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    async clickOnGetOrderHistoryLink() {
        const orderHistoryLink = await this.#driver.findElement(By.linkText('Order history'));
        await orderHistoryLink.click();
    }

    getPageHeaderTitle() {
        return this.#driver.findElement(By.css('h1')).getText();
    }

    async clickOnLogoutLink() {
/*
Possible xpaths for this element:
1.  //ul[contains(@class, "nav")]/li[3]/a
2.  //ul[contains(@class, "nav")]/li[contains(., "Logout")]/a
3.  //ul[contains(@class, "nav")]/li/a[contains(text(), "Logout")]
4.  //ul[contains(@class, "nav")]/li/a[contains(@href, "logout")]
*/        
        const logoutLink = await this.#driver.findElement(By.partialLinkText('Logout'));
        await logoutLink.click();        
    }

}