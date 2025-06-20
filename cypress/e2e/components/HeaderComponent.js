export default class HeaderComponent {

    get logOutLink() { return cy.contains('a', 'Logout');}
    get logIn() { return cy.contains('a', 'Log in');}
    get signUp() { return cy.contains('a', 'Sign up');}
    get heading() {return cy.contains('header.overview')}
    get h3Heading() {return cy.get('h3.elementor-heading-title')}
    get welcomeMsg() { return cy.get('.trans-title p')}

    performLogout() {
        this.logOutLink.click();
    }

    goToHome() {
        this.homeBtnLink.click();
    }

}
