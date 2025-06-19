import BasePage from "./BasePage";

class AccountPage extends BasePage{

    get heading() {return cy.contains('header.overview')}
    get h3Heading() {return cy.get('h3.elementor-heading-title')}
    get welcomeMsg() { return cy.get('.trans-title p')}

}


export default new AccountPage();

