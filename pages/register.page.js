'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class RegisterPage extends BasePage{
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }

    firstnameField = By.name('ime');
    lastnameField = By.name('prezime');
    emailField = By.name('email');
    usernameField = By.name('korisnicko');
    passwordField = By.id("password");
    passwordConfField = By.id("passwordAgain");
    registerButton = By.name('register');

    getRandomString(length) {
        var chars = 'abcdefghijklABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
           result += chars[(Math.floor(Math.random() * chars.length))];
        }
        return result;
     }

    async getFirstnameField() {
        const firstName = await this.#driver.findElement(this.firstnameField);
        await firstName.sendKeys(this.getRandomString(7));
    }

    async getLastnameField() {
        const lastName = await this.#driver.findElement(this.lastnameField);
        await lastName.sendKeys(this.getRandomString(7));
    }

    async getEmailField() {
        const email = await this.#driver.findElement(this.emailField);
        await email.sendKeys(this.getRandomString(7) + "@local.exmaple");
    }

    async getUsernameField() {
        const username = await this.#driver.findElement(this.usernameField);
        await username.sendKeys(this.getRandomString(7));
    }

    async getPasswordField() {
        const password = await this.#driver.findElement(this.passwordField);
        await password.sendKeys("user123!OK");
    }

    async getPasswordConformationField() {
        const passwordConformation = await this.#driver.findElement(this.passwordConfField);
        await passwordConformation.sendKeys("user123!OK");
    }

    getRegisterButton() {
        return this.#driver.findElement(this.registerButton);
        }
}