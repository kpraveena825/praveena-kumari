class EnvelopePage {

  // --- Element Getters ---
  get addEditEnvelopeLink() { return cy.contains('a', 'Add / Edit') }
  get addEnvelopeBtn() { return cy.get('#envelopes-reg + div > .btn') }
  get inputEnvelopeName() { return cy.get('#envelopes-reg > li:last-child input.name') }
  get inputEnvelopeAmt() { return cy.get('#envelopes-reg > li:last-child input.amount') }
  get saveEnvelopeBtn() { return cy.contains('button', 'Save Changes') }
  get closeDialogueBox() { return cy.get('#fillEnvelopesModalNo') }
  get monthyHeader() { return cy.contains('span', 'Monthly') }
  get removeEnvelope() { return cy.get('#envelopes-reg i.icon-remove-sign') }
  get fillEnvelopeBtn() { return cy.get('i.icon-env-btn') }
  get saveBtn() { return cy.get('#unallocatedSummary .btn-success') }
  get availableLink() { return cy.contains('a', 'Available') }
  get fetchEnvelopeNames() { return cy.xpath("//strong[text()='Monthly']//ancestor::li[1]//li//strong[@class='name']") }
  get fetchEnvelopeAmounts() { return cy.xpath("//strong[text()='Monthly']//ancestor::li[1]//li//div[@class='right']") }


  /**
   * Adds a new envelope under the Monthly section.
   * @param {string} envelopeName - The name of the envelope to add.
   * @param {number|string} amount - The budget amount to assign.
   */
  addEnvelope(envelopeName, amount) {
    this.addEditEnvelopeLink.click();
    this.monthyHeader.should('exist')
    this.addEnvelopeBtn.should('be.visible').click()

    this.inputEnvelopeName
      .should('exist')
      .last()
      .should('have.value', '')
      .type(envelopeName);

    this.inputEnvelopeAmt.type(amount)

    this.saveEnvelopeBtn.click();
    this.closeDialogueBox.should('exist').click();
  }

  /**
  * Returns the current count of envelopes listed under Monthly section.
  */
  getEnvelopeCount() {
    return this.fetchEnvelopeNames.its('length');
  }

  /**
  * Returns the newly added envelop name .
  */
  validateEnvelopeName() {
    return this.fetchEnvelopeNames.last().should('exist').invoke('text');
  }

  /**
  * Returns the newly added envelop amount .
  */
  validateEnvelopeAmount() {
    return this.fetchEnvelopeAmounts.last().invoke('text');
  }

  /**
   * Deletes the last added envelope in the UI.
   */
  deleteEnvelop() {
    this.addEditEnvelopeLink.click();
    this.removeEnvelope.last().should('be.visible').click();
    this.saveEnvelopeBtn.should('be.enabled').click();
  }

  /**
   * Fills an existing envelope with a specified expense amount.
   * @param {string} name - The name of the envelope to fill.
   * @param {number|string} amount - The expense amount to fill.
   */
  fillEnvelope(name, amount) {
    this.fillEnvelopeBtn.click();
    this.availableLink.click();
    cy.contains('h4', name)
      .parents('fieldset')
      .find('input.eebaAmount')
      .clear()
      .type(amount);

    this.saveBtn.click();
  }

}

export default new EnvelopePage();
