export default class HeaderComponent {

    get logOutLink() { return cy.contains('a', 'Logout');}
    get addTransaction() { return cy.contains('a', 'Add Transaction');}
    get fillEnvelopes() { return cy.contains('a', 'Fill Envelopes');}
    get logIn() { return cy.contains('a', 'Log in');}
    get signUp() { return cy.contains('a', 'Sign up');}

    performLogout() {
        this.logOutLink.click();
    }

    goToHome() {
        this.homeBtnLink.click();
    }

}
