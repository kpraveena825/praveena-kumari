
import AccountPage from "../pages/AccountPage";
import TransactionPage from "../pages/TransactionPage";
import { validationMessages } from "../config/errorMessages";

describe("Validating Transaction update", { tags: ['@Cart', '@regression'] }, () => {

    beforeEach(() => {
        cy.fixture('budget.json').as('budget')
        cy.login(); //login via custom command
        AccountPage.welcomeMsg
            .should('contains.text', validationMessages.WELCOME_MSG);

    })

    it("should update the Total balance when a new income transaction is added", { tags: '@smoke' }, function () {
        let income = this.budget.income
        TransactionPage.gotoAccountsTab();

        TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((initialAmount) => {
            const expectedAmount = initialAmount + income;

            TransactionPage.addIncometoMyAccount(income);
            TransactionPage
                .waitForAmountToUpdate(TransactionPage.myAccount, initialAmount);

            TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((updatedAmount) => {
                expect(updatedAmount).to.equal(expectedAmount);
            });
        });

    });
    
    it("should remove the latest transaction and reflect the correct updated balance in Total section", function () {

        let income = this.budget.income
        TransactionPage.addIncometoMyAccount(income);
        TransactionPage.gotoAccountsTab();

        TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((initialAmount) => {
            TransactionPage.fetchandLatestTxn().then((txnAmount) => {

                const expectedAmount = initialAmount - txnAmount;

                TransactionPage.deleteLatestTxn();
                TransactionPage.waitForAmountToUpdate(TransactionPage.myAccount, initialAmount);
                TransactionPage.parseAmountFromElement(TransactionPage.myAccount).then((updatedAmount) => {
                    expect(updatedAmount).to.equal(expectedAmount);
                });
            });
        });
    });

})