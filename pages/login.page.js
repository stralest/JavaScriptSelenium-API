'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class LoginPage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }

    getInputUsername() {
        return this.#driver.findElement(By.name('username'));
    }
    
    getInputPassword() {
        return this.#driver.findElement(By.name('password'));
    }

    async clickOnLoginButton() {
         const buttonLogin = await this.#driver.findElement(By.name('login'));
         await buttonLogin.click();
    }
}