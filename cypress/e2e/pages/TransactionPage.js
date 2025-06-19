import BasePage from "./BasePage";

class TransactionPage extends BasePage {

  get addTxnLink() { return cy.get('i.icon-trans-btn') }

  get incomeTab() { return cy.get('#incomeTab') }

  get incomeInputTextBox() { return cy.get('input[name="income-amount"]') }

  get saveTxnBtn() { return cy.get('#addTransactionSave') }

  get slectAccount() { return cy.get('select[name="account"] option') }

  get accountsTab() { return cy.get('li.tab-accounts') }

  get productDescription() { return cy.get('#content .intro'); }

  get totalAmount() { return cy.get('.nodes-total > li:contains("Total") .right strong') }

  get myAccount() {
    return cy.get('strong.name:contains("My Account")')
      .parents('.wrapper-item')
      .find('.right strong');
  }
  get availableBalance() { return cy.get('#env-inc-wrapper .right strong').first() }

  get availableAmount() { return cy.get('.nodes-total > li:contains("Available") .right strong') }

  get monthlyTotal() { return cy.get('.nodes-total > li:contains("Monthly") .right strong') }

  get monthlyGroceries() {
    return cy.get('strong.name:contains("Groceries")').parents('.wrapper-item').find('.right strong')
  }

  get monthlyGas() {
    return cy.get('strong.name:contains("Gas")').parents('.wrapper-item').find('.right strong')
  }

  get annualSavings() {
    return cy.get('strong.name:contains("Savings")').parents('.wrapper-item').find('.right strong')
  }

  get incomeTxn() { return cy.get('tr#see-all-scheduled').next() }

  get deleteTxn() { return cy.get('#addTransactionDelete') }

  parseAmount(text) {
    return parseFloat(text.replace(/[^0-9.]/g, '').trim());
  }

  fetchAvailableAmount() {
    return this.availableAmount.invoke('text').then((text) => {
      const amount = parseFloat(text.replace(/,/g, '').trim());
      return amount;
    });
  }

  parseAmountFromElement(locator) {
    return locator.invoke('text').then((text) => {
      const amount = parseFloat(text.replace(/,/g, '').trim());
      return amount;
    });
  }

  waitForAmountToUpdate(locator, previousAmount) {
    locator.should(($el) => {
      const current = parseFloat($el.text().replace(/,/g, ''));
      expect(current).to.not.equal(previousAmount);
    });
  }

  verifyUpdatedAmount(locator, expectedAmount) {
    this.parseAmountFromElement(this.myAccount).then((actual) => {
      expect(actual).to.equal(expectedAmount);
    });
  }

  fetchandLatestTxn() {
    return this.incomeTxn.click({ force: true }).then(() => {
      return this.incomeInputTextBox.should('be.visible').invoke('val').then((val) => {
        return parseFloat(val.replace(/,/g, '').trim());
      });
    });
  }

  deleteLatestTxn() {
    this.deleteTxn.click();
  }

  gotoAccountsTab() {
    this.accountsTab.click()
  }

  addIncometoMyAccount(income) {
    this.addTxnLink.click();
    this.incomeTab.click();
    this.incomeInputTextBox.should('exist')
    .clear()
    .type(income, { delay: 100, force: true })
    this.selectDropDownValue();
    this.saveTxnBtn.click();
  }

  selectDropDownValue() {
    this.slectAccount
      .contains('My Account') 
      .then((option) => {
        const val = option.val(); 
        cy.get('select[name="account"]').select(val); 
      });
  }

}


export default new TransactionPage();

