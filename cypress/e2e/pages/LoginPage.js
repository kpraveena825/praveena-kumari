import BasePage from "./BasePage";
class LoginPage extends BasePage {

    // --- Element Getters ---
    get loginLink() { return cy.contains('a', 'Log in'); }
    get loginInput() { return cy.get('[name="_username"]') }
    get passwordInput() { return cy.get('[name="_password"]') }
    get loginBtn() { return cy.contains('button', 'Log In'); }
    get authError() { return cy.get('label.error'); }

    open() {
        return cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
    }

    //For new User Sign Up 
    openRegistrationPage() {
        this.open();
        this.continueBtn.click();
    }

     /**
   * login with credentials.
   * @param {string} email - User email address.
   * @param {string} password - User account password.
   */
    loginWithUI(email, password) {
        this.open();
        this.loginLink.should('be.visible').click();
        this.loginInput.type(email)
        this.passwordInput.type(password)
        this.loginBtn.click()
    }

}

export default new LoginPage();

