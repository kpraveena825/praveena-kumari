import BasePage from "./BasePage";
class LoginPage extends BasePage{

    get loginLink() { return cy.contains('a', 'Log in'); }
    get loginInput() { return cy.get('[name="_username"]') }
    get passwordInput() { return cy.get('[name="_password"]') }
    get loginBtn() { return cy.contains('button', 'Log In');}
    get authError() { return cy.get('label.error'); }
    
    open() { 
        return cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
    }

    openRegistrationPage() {
        this.open();
        this.continueBtn.click();
    }

    loginWithUI(email, password) {
        this.open();
        this.loginLink.click();
        this.loginInput.type(email)
        this.passwordInput.type(password)
        this.loginBtn.click()
    }
    
     confirmPolicy(value) {
        if(value) {
            this.policyCheckbox.check();
        } else {
            this.policyCheckbox.uncheck();
        }
        return this;
    }

}

export default new LoginPage();

