require("selenium-webdriver/chrome");
require('selenium-webdriver/edge');

const { Builder, By, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const RegisterPage = require("../pages/register.page");
const LoginPage = require("../pages/login.page");
const CartPage = require("../pages/cart.page");
const CheckoutPage = require("../pages/checkout.page");
const HistoryPage = require("../pages/history.page");

describe("shop.QA.rs tests", function() {
    let driver;
    let pageHomepage;
    let pageRegister;
    let pageLogin;
    let pageCart;
    let pageCheckout;
    let pageHistory;

    const browsers = {
        chrome: 'chrome',
        microsoftEdge: 'MicrosoftEdge',
    };

    const packageToAdd = 'starter';
    const packageQuantity = '2';

    before(async function() {
        driver = await new Builder().forBrowser(browsers.chrome).build();
        await driver.manage().window().maximize();
        pageHomepage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCart = new CartPage(driver);
        pageCheckout = new CheckoutPage(driver);
        pageHistory = new HistoryPage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it("Verify homepage is open", async function() {
        await pageHomepage.goToPage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain("(QA) Shop");
        expect(await pageHomepage.isBugListDivDisplayed()).to.be.true;
    });

    it("Goes to registration page", async function() {
        await pageHomepage.clickOnRegisterLink();
        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
    });

    it('Successfuly performs registration', async function() {
        await pageRegister.getInputFirstname().sendKeys('Bob');
        await pageRegister.getInputLastname().sendKeys('Buttons');
        await pageRegister.getInputEmail().sendKeys('bob.buttons@example.local');
        await pageRegister.getInputUsername().sendKeys('bob.buttons');
        await pageRegister.getInputPassword().sendKeys('nekaLozinka123');
        await pageRegister.getInputPasswordConfirmation().sendKeys('nekaLozinka123');
        await pageRegister.getRegisterButton().click();

        expect(await pageHomepage.getSuccesssAlertText()).to.contain('Uspeh!');
    });

    it('Goes to login page', async function() {
        await pageLogin.goToPage();
        
        await pageLogin.getInputUsername().sendKeys('aaa');
        await pageLogin.getInputPassword().sendKeys('aaa');
        await pageLogin.clickOnLoginButton();
        
        expect(await pageHomepage.getWelcomeBackTitle()).to.contain('Welcome back,');
        expect(await pageHomepage.isLogoutLinkDisplayed()).to.be.true;
    });

    it("Adds item to cart - Starter, 2 items", async function() {
        const packageDiv = await pageHomepage.getPackageDiv(packageToAdd);
        const quantity = await pageHomepage.getQuantityDropdown(packageDiv);
        const options = await pageHomepage.getQuantityOptions(quantity);

        await Promise.all(options.map(async function(option) {
            const text = await option.getText();
            if (text === packageQuantity) {
                await option.click();

                const selectedValue = await quantity.getAttribute('value');
                expect(selectedValue).to.contain(packageQuantity);

                const buttonOrder = await pageHomepage.getOrderButton(packageDiv);
                await buttonOrder.click();

                expect(await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/order');
            }
        }));
    });

    it("Opens shopping cart", async function() {
        await pageHomepage.clickOnViewShoppingCartLink();

        expect(await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/cart');
        expect(await pageCart.getPageHeaderTitle()).to.contain('Order');
    });

    it("Verifies items are in cart - Starter, 2 items", async function() {
        const orderRow = await pageCart.getOrderRow(packageToAdd.toUpperCase());
        const itemQuantity = await pageCart.getItemQuantity(orderRow);

        expect(await itemQuantity.getText()).to.eq(packageQuantity);
    });

    it("Verifies total item price is correct", async function() {
        const orderRow = await pageCart.getOrderRow(packageToAdd.toUpperCase());
        const itemQuantity = await pageCart.getItemQuantity(orderRow);
        const itemPrice = await pageCart.getItemPrice(orderRow);
        const itemPriceTotal = await pageCart.getItemPriceTotal(orderRow);

        const qntty = Number(await itemQuantity.getText());
        const price = Number((await itemPrice.getText()).replace(/\D/g, ''));
        const total = Number((await itemPriceTotal.getText()).replace(/\D/g, ''));

        const calculatedItemPriceTotal = qntty * price;
        
        expect(calculatedItemPriceTotal).to.be.eq(total);
        
    });

    it("Performs checkout", async function() {
        await pageCart.clickOnCheckoutButton();

        expect(await pageCheckout.getCheckoutSuccessTitle()).to.contain('(Order #');
    });

    it("Verifies checkout success", async function() {
        const orderNumber = await pageCheckout.getCheckoutOrderNumber();

        await pageCheckout.clickOnGetOrderHistoryLink();

        expect(await pageHistory.getPageHeaderTitle()).to.contain('Order History');

        const historyRow = await pageHistory.getHistoryRow(orderNumber);
        const historyStatus = await pageHistory.getHistoryStatus(historyRow).getText();

        expect(historyStatus).to.be.eq('Ordered');
    });

    it("Performs logout", async function() {
        await pageHistory.clickOnLogoutLink();

        expect(await pageHomepage.isLoginLinkDisplayed()).to.be.true;
    });

});
