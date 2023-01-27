'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class LoginPage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }

    usernameField = By.name('username');
    passwordField = By.name('password');
    loginButton = By.name('login');

    getInputUsername() {
        return this.#driver.findElement(this.usernameField);
    }
    
    getInputPassword() {
        return this.#driver.findElement(this.passwordField);
    }

    async clickOnLoginButton() {
         const buttonLogin = await this.#driver.findElement(this.loginButton);
         await buttonLogin.click();
    }
}