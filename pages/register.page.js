'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class RegisterPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage() {
        this.#driver.get("http://shop.qa.rs/register");
    }

    getRegisterButtonValue() {
        return this.getRegisterButton().getAttribute('value');
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