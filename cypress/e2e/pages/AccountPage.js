import BasePage from "./BasePage";

class AccountPage extends BasePage{

    get heading() {return cy.contains('header.overview')}
    get h3Heading() {return cy.get('h3.elementor-heading-title')}
    get welcomeMsg() { return cy.get('.trans-title p')}

    // open() {
    //     return super.open(ENDPOINT_PREFIX + routes.ACCOUNT_ENDPOINT)
    // }

}


export default new AccountPage();

