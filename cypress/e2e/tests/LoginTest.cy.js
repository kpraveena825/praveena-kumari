import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";
const routes = require('../config/routes');
import { validationMessages } from "../config/validationMessages";

describe("User Login - Success and Failure Scenarios", { tags: ['@Login', '@regression'] }, () => {

    let basePage;

    beforeEach(() => {
        basePage = new BasePage();
        cy.fixture('users.json').as('users')
    })

    it("should login successfully with valid credentials", { tags: '@smoke' }, function () {

        cy.login();

        cy.url().should('include', routes.HOME_ENDPOINT);

        basePage.header.welcomeMsg.should('contains.text', validationMessages.WELCOME_MSG);
    })

    it("should fail to login with invalid credentials", { tags: '@smoke' }, function () {

        LoginPage.loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password)

        LoginPage.authError.should('contains.text', validationMessages.AUTH_ERROR);
    })

    it("should fail to login for NO credentials ", function () {

        LoginPage.loginWithUI(this.users.blankValue.email, this.users.blankValue.password)

        LoginPage.authError.should('contains.text', validationMessages.AUTH_ERROR);

    })

    it("should perform login and logout", function () {

        cy.login();

        basePage.header.performLogout();

        basePage.header.h3Heading.should('contains.text', validationMessages.LOGOUT_MSG); //
    })
})