'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class BasePage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    orderHistoryLink = By.linkText('Order history');
    logOutLink = By.partialLinkText('Logout');
    logInLink = By.linkText('Login');
    headingOne = By.css('h1');
    table = By.css('table');
    headingTwo = By.css("h2");


    goToPage(url){
        return this.#driver.get(url);    
    }

    getCurrentUrl(){
        return this.#driver.getCurrentUrl();
    }

    async clickOnGetOrderHistoryLink() {
        const orderHistoryLink = await this.#driver.findElement(this.orderHistoryLink);
        await orderHistoryLink.click();
    }

    getLogoutLink() {
        return this.#driver.findElement(this.logOutLink);
    }

    getLoginLink() {
        return this.#driver.findElement(this.logInLink);
    }

    getH1() {
        return this.#driver.findElement(this.headingOne);
    }

    getTable() {
        return this.#driver.findElement(this.table);
    }

    getH2(){
        return this.#driver.findElement(this.headingTwo);
    }
}