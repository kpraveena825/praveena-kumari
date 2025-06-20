import BasePage from "./BasePage";

class TransactionPage extends BasePage {

  // --- Element Getters ---
  get addTxnLink() { return cy.get('i.icon-trans-btn') }

  get incomeTab() { return cy.get('#incomeTab') }

  get incomeInputTextBox() { return cy.get('input[name="income-amount"]') }

  get saveTxnBtn() { return cy.get('#addTransactionSave') }

  get slectAccount() { return cy.get('select[name="account"] option') }

  get accountsTab() { return cy.get('li.tab-accounts') }

  get productDescription() { return cy.get('#content .intro'); }

  get availableBalance() { return cy.get('#env-inc-wrapper .right strong').first() }

  get myAccount() {
    return cy.get('strong.name:contains("My Account")')
      .parents('.wrapper-item')
      .find('.right strong');
  }
  get availableAmount() { return cy.get('.nodes-total > li:contains("Available") .right strong') }

  get incomeTxn() { return cy.get('tr#see-all-scheduled').next() }

  get deleteTxn() { return cy.get('#addTransactionDelete') }

  //To parse the text value into float by removing special characters
  parseAmount(text) {
    return parseFloat(text.replace(/[^0-9.]/g, '').trim());
  }

  //Function to fetch Availabe amount from home screen
  fetchAvailableAmount() {
    return this.availableAmount.invoke('text').then((text) => {
      const amount = parseFloat(text.replace(/,/g, '').trim());
      return amount;
    });
  }

  //Parse the text into float by removing special characters
  parseAmountFromElement(locator) {
    return locator.invoke('text').then((text) => {
      const amount = parseFloat(text.replace(/,/g, '').trim());
      return amount;
    });
  }

  /**
   * wait for the amount to get updated.
   * @param {locator object} locator - the locator to wait for and fetch amount
   * @param {float} previousAmount - Amount before update
   */
  waitForAmountToUpdate(locator, previousAmount) {
    locator.should(($el) => {
      const current = parseFloat($el.text().replace(/,/g, ''));
      expect(current).to.not.equal(previousAmount);
    });
  }

  //To featch latest transactions from Transactions section
  fetchLatestTxn() {
    return this.incomeTxn.click({ force: true }).then(() => {
      return this.incomeInputTextBox.should('be.visible').invoke('val').then((val) => {
        return parseFloat(val.replace(/,/g, '').trim());
      });
    });
  }

  //To delete latest availabe transactions
  deleteLatestTxn() {
    this.deleteTxn.click();
  }

  //Function to navigates to account tab
  gotoAccountsTab() {
    this.accountsTab.click()
  }

  /**
  * Add balance to account
  */
  addIncometoMyAccount(income) {
    this.addTxnLink.click();
    this.incomeTab.should('be.visible').click();
    this.incomeInputTextBox.should('exist')
      .clear()
      .type(income, { delay: 100, force: true })
    this.selectDropDownValue();
    this.saveTxnBtn.click();
  }

  //Select your accountfrom Dropdown
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

