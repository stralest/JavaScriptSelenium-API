'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class BasePage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage(url){
        return this.#driver.get(url);    
    }

    getCurrentUrl(){
        return this.#driver.getCurrentUrl();
    }

    async clickOnGetOrderHistoryLink() {
        const orderHistoryLink = await this.#driver.findElement(By.linkText('Order history'));
        await orderHistoryLink.click();
    }

    getLogoutLink() {
        return this.#driver.findElement(By.partialLinkText('Logout'));
    }

    getLoginLink() {
        return this.#driver.findElement(By.linkText('Login'));
    }

    getPageHeaderTitle() {
        return this.#driver.findElement(By.css('h1'));
    }
}