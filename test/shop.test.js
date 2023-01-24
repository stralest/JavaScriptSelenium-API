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
const BasePage = require("../pages/base.page");

describe("shop.QA.rs tests", function() {
    let driver;
    let pageHomepage;
    let pageRegister;
    let pageLogin;
    let pageCart;
    let pageCheckout;
    let pageHistory;
    let pageBase;

    const browsers = {
        chrome: 'chrome',
        microsoftEdge: 'MicrosoftEdge',
    };

    const packageToAdd = 'pro';
    const packageQuantity = '3';

    before(async function() {
        driver = await new Builder().forBrowser(browsers.chrome).build();
        await driver.manage().window().maximize();
        pageHomepage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCart = new CartPage(driver);
        pageCheckout = new CheckoutPage(driver);
        pageHistory = new HistoryPage(driver);
        pageBase = new BasePage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it("Verify homepage is open", async function() {
        await pageHomepage.goToPage("http://shop.qa.rs/");
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(await pageTitle.getText()).to.contain("(QA) Shop");
        expect(await pageHomepage.getBugListDiv().isDisplayed()).to.be.true;
    });

    it("Goes to registration page", async function() {
        await pageHomepage.clickOnRegisterLink();
        const registerButton = await pageRegister.getRegisterButton();
        expect(await registerButton.isDisplayed()).to.be.true;
    });

    it('Successfuly performs registration', async function() {
        await pageRegister.getInputFirstname().sendKeys('Bob');
        await pageRegister.getInputLastname().sendKeys('Buttons');
        await pageRegister.getInputEmail().sendKeys('bob.buttons@example.local');
        await pageRegister.getInputUsername().sendKeys('bob.buttons');
        await pageRegister.getInputPassword().sendKeys('nekaLozinka123');
        await pageRegister.getInputPasswordConfirmation().sendKeys('nekaLozinka123');
        await pageRegister.getRegisterButton().click();

        const successText = await pageHomepage.getSuccesssAlertText();

        expect(await successText.getText()).to.contain('Uspeh!');
    });

    it('Goes to login page', async function() {
        await pageLogin.goToPage("http://shop.qa.rs/login");
        
        await pageLogin.getInputUsername().sendKeys('aaa');
        await pageLogin.getInputPassword().sendKeys('aaa');
        await pageLogin.clickOnLoginButton();
        
        const welcomeBackTitle = await pageHomepage.getWelcomeBackTitle();

        expect(await welcomeBackTitle.getText()).to.contain('Welcome back,');
        expect(await pageHomepage.getLogoutLink().isDisplayed()).to.be.true;
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

                expect(await pageBase.getCurrentUrl()).to.eql('http://shop.qa.rs/order');
            }
        }));
    });

    it("Opens shopping cart", async function() {
        await pageHomepage.clickOnViewShoppingCartLink();

        expect(await pageBase.getCurrentUrl()).to.eql('http://shop.qa.rs/cart');

        const headerTitle = await pageCart.getPageHeaderTitle();
        expect(await headerTitle.getText()).to.contain('Order');
    });

    it("Verifies items are in cart - Starter, 2 items", async function() {
        const orderRow = await pageCart.getOrderRow(packageToAdd.toUpperCase());
        const itemQuantity = await pageCart.getItemQuantity(orderRow);

        expect(await itemQuantity.getText()).to.eql(packageQuantity);
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
        
        expect(calculatedItemPriceTotal).to.be.eql(total);
        
    });

    it("Performs checkout", async function() {
        await pageCart.clickOnCheckoutButton();

        const checkoutSuccessTitle = await pageCheckout.getCheckoutSuccessTitle();
        expect(await checkoutSuccessTitle.getText()).to.contain('(Order #');
    });

    it("Verifies checkout success", async function() {
        const orderNumber = (await pageCheckout.getCheckoutSuccessTitle().getText()).replace(/\D/g, '');

        await pageCheckout.clickOnGetOrderHistoryLink();

        const pageHeaderTitle = await pageCheckout.getPageHeaderTitle();
        expect(await pageHeaderTitle.getText()).to.contain('Order History');

        const historyRow = await pageHistory.getHistoryRow(orderNumber);
        const historyStatus = await pageHistory.getHistoryStatus(historyRow);

        expect(await historyStatus.getText()).to.be.eql('Ordered');
    });

    it("Performs logout", async function() {
        await pageHistory.getLogoutLink().click();

        const loginLink = await pageHomepage.getLoginLink();
        expect(await loginLink.isDisplayed()).to.be.true;
    });

});

    
    
