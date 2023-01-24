'use strict';
const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("./base.page");

module.exports = class RegisterPage extends BasePage{
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }

    getRegisterButton() {
        return this.#driver.findElement(By.name('register'));
    }

    getInputFirstname() {
        return this.#driver.findElement(By.name('ime'));
    }

    getInputLastname() {
        return this.#driver.findElement(By.name('prezime'));
    }

    getInputEmail() {
        return this.#driver.findElement(By.name('email'));
    }

    getInputUsername() {
        return this.#driver.findElement(By.name('korisnicko'));
    }

    getInputPassword() {
        return this.#driver.findElement(By.name('lozinka'));
    }

    getInputPasswordConfirmation() {
        return this.#driver.findElement(By.name('lozinkaOpet'));
    }
}