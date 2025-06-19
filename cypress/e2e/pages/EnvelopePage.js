import BasePage from "./BasePage";

class EnvelopePage extends BasePage {

  get addEditEnvelopLink() { return cy.contains('a', 'Add / Edit') }
  get addEnvelopeBtn() { return cy.get('envelope-list form.form-edit-envelope').first().find('button').contains('Add') }
  get inputEnvelopeName() { return cy.get('ul#envelopes-reg > li:last-child input.name') }
  get inputEnvelopeAmt() { return cy.get('ul#envelopes-reg > li:last-child input.amount') }
  get saveEnvelopeBtn() { return cy.contains('button', 'Save Changes') }
  get fetchEnvelopName() { return cy.xpath("//strong[text()='Monthly']//ancestor::li[1]//li//strong[@class='name']").last() }
  get fetchEnvelopAmount() { return cy.xpath("//strong[text()='Monthly']//ancestor::li[1]//li//div[@class='right']").last() }
  get closeDialogueBox() { return cy.get('#fillEnvelopesModalNo') }
  get monthyHeader() { return cy.contains('span', 'Monthly') }
  get removeEnvelope() { return cy.get('ul#envelopes-reg > li:last-child i.icon-remove-sign') }
  get fillEnvelopBtn() { return cy.get('i.icon-env-btn') }
  get saveBtn() { return cy.get('#unallocatedSummary .btn-success') }
  get availableLink() { return cy.contains('a', 'Available') }


  addEnvelope(envelopeName, amount) {
    this.addEditEnvelopLink.click();
    this.monthyHeader.should('exist')
    this.addEnvelopeBtn.click()
    this.inputEnvelopeName
      .should('exist')
      .last()
      .should('have.value', '')
      .type(envelopeName);
    this.inputEnvelopeAmt.type(amount)
    this.saveEnvelopeBtn.click();
    this.closeDialogueBox.click();

  }

  validateEnvelopeName() {
    return this.fetchEnvelopName.should('exist').invoke('text');
  }
  validateEnvelopeAmount() {
    return this.fetchEnvelopAmount.invoke('text');
  }

  deleteEnvelop() {
    this.addEditEnvelopLink.click();
    this.removeEnvelope.should('exist').click();
    this.saveEnvelopeBtn.click();
  }

  fillEnvelope(name, amount) {
    this.fillEnvelopBtn.click();
    this.availableLink.click();
    cy.contains('h4', name).parents('fieldset').find('input.eebaAmount').clear().type(amount);
    this.saveBtn.click();
  }

}

export default new EnvelopePage();
