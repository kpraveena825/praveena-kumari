import TransactionPage from "../pages/TransactionPage";
import BasePage from "../pages/BasePage";
import { validationMessages } from "../config/validationMessages";

describe("Validating Transaction update", { tags: ['@Transaction', '@regression'] }, () => {

    let basePage;

    beforeEach(() => {
        basePage = new BasePage();
        cy.fixture('budget.json').as('budget') //load Test data
        cy.login(); //login via custom command
        basePage.header.welcomeMsg
            .should('contains.text', validationMessages.WELCOME_MSG);
    })

    it("should update the Total balance when a new income transaction is added", { tags: '@smoke' }, function () {
        const txnAmount = this.budget.income

        // Go to accounts section
        TransactionPage.gotoAccountsTab();

        // Capture current account balance
        TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((initialBalance) => {
            const finalBalance = initialBalance + txnAmount;

            // Add income transaction
            TransactionPage.addIncometoMyAccount(txnAmount);

            // Wait until UI reflects the updated balance
            TransactionPage.waitForAmountToUpdate(TransactionPage.myAccount, initialBalance);

            // Validate updated balance matches expected value
            TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((updatedBalance) => {
                expect(updatedBalance).to.equal(finalBalance);
            });
        });

    });

    it("should remove the latest transaction and reflect the correct updated balance in Total section", function () {

        const txnAmount = this.budget.income

        // Add a transaction first so that we have one to delete
        TransactionPage.addIncometoMyAccount(txnAmount);
        TransactionPage.gotoAccountsTab();

        // Get balance before deletion
        TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((initialBalance) => {
            TransactionPage.fetchLatestTxn().then((txnAmount) => {

                const finalBalance = initialBalance - txnAmount;

                // Delete the latest transaction
                TransactionPage.deleteLatestTxn();

                // Wait until balance is updated in UI
                TransactionPage.waitForAmountToUpdate(TransactionPage.myAccount, initialBalance);

                // Validate updated balance after deleting income
                TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((updatedBalance) => {
                    expect(updatedBalance).to.equal(finalBalance);
                });
            });
        });
    });

})