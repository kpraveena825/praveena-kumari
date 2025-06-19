
import AccountPage from "../pages/AccountPage";
import EnvelopePage from "../pages/EnvelopePage";
import TransactionPage from "../pages/TransactionPage";
import { validationMessages } from "../config/errorMessages";

describe("Envelope Management Functionality", { tags: ['@envelope', '@regression'] }, () => {

  beforeEach(() => {
    cy.fixture('envelope').as('envelopeData');
    cy.login(); // Login via custom command
    AccountPage.welcomeMsg
      .should('contains.text', validationMessages.WELCOME_MSG);

  })

  it("should allow the user to add a new envelope and successfully delete it", { tags: '@smoke' }, function () {
    const items = this.envelopeData.envelopes[0].items;
    items.forEach((item) => {
      EnvelopePage.addEnvelope(item.name, item.budget);
      EnvelopePage.validateEnvelopeName().should('eq', item.name);
      EnvelopePage.validateEnvelopeAmount().should('contains', item.budget);
      EnvelopePage.deleteEnvelop();
      EnvelopePage.validateEnvelopeName().should('not.eq', item.name);
    });
  });

  it("should fill an envelope and validate that the available amount is updated correctly", function () {
    const items = this.envelopeData.existingEnvelope[0].items;
    items.forEach((item) => {
      TransactionPage.parseAmountFromElement(TransactionPage.availableBalance).then((initialAmount) => {
        EnvelopePage.fillEnvelope(item.name, item.addExpense);
        const expectedAmount = initialAmount - parseFloat(item.addExpense);
        TransactionPage.parseAmountFromElement(TransactionPage.availableBalance).then((updatedAmount) => {
          expect(updatedAmount).to.equal(expectedAmount);
        });
      });
    });
  });


})