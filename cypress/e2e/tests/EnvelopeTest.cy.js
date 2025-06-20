import EnvelopePage from "../pages/EnvelopePage";
import TransactionPage from "../pages/TransactionPage";
import BasePage from "../pages/BasePage";
import { validationMessages } from "../config/validationMessages";


describe("Envelope Management Functionality", { tags: ['@envelope', '@regression'] }, () => {
let basePage;

  beforeEach(() => {
    basePage = new BasePage();
    cy.fixture('budget.json').as('envelopeData');
    cy.login(); // Login via custom command
    basePage.header.welcomeMsg
      .should('contains.text', validationMessages.WELCOME_MSG);

  })

  it("should allow the user to add a new envelope and successfully delete it", { tags: '@smoke' }, function () {
    const items = this.envelopeData.envelopes[0].items;
    items.forEach((item) => {
        // Step 1: Get count before adding
      EnvelopePage.getEnvelopeCount().then((countBefore) => {

        // Step 2: Add envelope
        EnvelopePage.addEnvelope(item.name, item.budget);

        // Step 3: Verify it appears in the list and count is incrased
        EnvelopePage.validateEnvelopeName().should('eq', item.name);
        EnvelopePage.validateEnvelopeAmount().should('contains', item.budget);
        EnvelopePage.getEnvelopeCount().should('eq', countBefore + 1);

        //Step 4: Delete the envelope
        EnvelopePage.deleteEnvelop();

        // Step 6: Verify it no longer exists and count returned to original value
        EnvelopePage.validateEnvelopeName().should('not.eq', item.name);
        EnvelopePage.getEnvelopeCount().should('eq', countBefore);
      });
    });
  });

  it("should fill an envelope and validate that the available amount is updated correctly", function () {
    const items = this.envelopeData.existingEnvelope[0].items;

    items.forEach((item) => {
      // Step 1: Capture initial balance
      TransactionPage.parseAmountFromElement(TransactionPage.availableBalance).then((initialAmount) => {

        // Step 2: Fill balance in default envelop
        EnvelopePage.fillEnvelope(item.name, item.addExpense);

        // Step 4: Calculate expected value
        const expectedAmount = initialAmount - parseFloat(item.addExpense);

         // Step 5: Validate updated balance
        TransactionPage.parseAmountFromElement(TransactionPage.availableBalance).then((updatedAmount) => {
          expect(updatedAmount).to.equal(expectedAmount);
        });
      });
    });
  });


})