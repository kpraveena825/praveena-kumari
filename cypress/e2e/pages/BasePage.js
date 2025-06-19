import HeaderComponent from "../components/HeaderComponent";

class BasePage {

    constructor() {
        this.header = new HeaderComponent();
    }

    open(path) {
        return cy.visit(path)
    }

    parseAmountFromElement(locator) {
    return locator.invoke('text').then((text) => {
      const amount = parseFloat(text.replace(/,/g, '').trim());
      return amount;
    });
  }
}

export default BasePage;
