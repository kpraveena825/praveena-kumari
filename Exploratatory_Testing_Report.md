### Exploratory Testing Charter: ###

**Application under Test** : *https://goodbudget.com/*

| Charter | Priority | Reason                                                                                   |
|---------|----------|------------------------------------------------------------------------------------------|
| C1      | High     | Security issues in login/signup can compromise app safety and make it vulnerable to cyberattacks. |
| C2      | Medium   | Data validation impacts user experience and data quality.                                |
| C3      | High     | Core functionality defects in an application that deals with financial data can lead to loss of potential users. |
| C4      | Medium   | Responsiveness issues impact usability on mobile devices.                                |
| C5      | Low      | Accessibility and performance issues affect overall user reach and inclusivity.          |

#### C1 - Test Login/Sign up functionalities to chech possible security breaches in the application #### 
- Test for Domain level validations, email format in the signup email(eg : xyz.com@gmail, xyz@gmailcom etc.. )
- Test email limits, and malformed data  (e.g., @@)
- Test password strength enforcement and ensure password masking is enabled (minimum length, complexity)
- Test session validity and session expiration behavior.
- Verify logout functionality clears session/cookies properly.
- Check if actions persist after a page refresh or session restore.

#### C2 - Ensure data accuracy and error handling in user input fields ####
- Check if clear and secure error messages are shown (no sensitive information is disclosed in messages)
- Validate all mandatory fields behave correctly on submit and reset.
- Verify that invalid inputs do not get saved or passed to APIs and database. 

#### C3 -Verify core functional behaviors such as transactions, Envelop,Login and SignUp ####
###### LOGIN: ######
 - Successful login with valid credentials redirects to the home page.
 - Signup flow correctly stores user data and sends a confirmation email

 ###### TRANSACTION: ######
 - Add a new transactions and check it's saved properly and Availabe balance is updated accordingly.
 - Edit and delete existing transactions and verify Ui update and database Synch
 - Check behavior on invalid, empty or negative transaction submissions
 - Verify transfer, Income, debt Transaction, Expense Credit functionalities
 - Check for export transaction reulting in CSV file download and Import transaction is allowing to upload the file. 

 ###### ENVELOPES: ######
 - Verify Add, edit, and delete envelopes.
 - Ensure updated envelope budgets reflect correctly in totals
 - Check -ve and invalid amount is not accepted while setting the budget
 - Validate envelope limits or constraints (e.g., Behavior on exceeding total budget).
 - Validate Add more Envelopes functionality 
 - Verify Bufget scheduling functionalities

###### OTHER VALIDATIONS: ######
 - Verifng the navigation sections/Subheader like <br>
   reports generation under Report, Guideline under Help and Links accesibility under Learns Header

#### C4 -Test UI is Responsiven and adjusting resolution based on the view across all applicable browsers and devices ####
- Test UI is adjucting the layout based on the view [ mobile/browsers/tablet]
- Resize browsers/mobile/tablet and evaluate layout realign and scale correctly
- Check responsiveness across the devices and browsers
- Confirm that inputs, buttons, and dropdowns are usable and responsive on all applicable screen sizes

#### C5 - Testing if the UI is compliance with Accessibility & Performance ####
- Check for consistent and logical tab order using keyboard
- Run Lighthouse and check Pageload, accessibility score and performance score


### Findings from the Charter ###

#### Defects ####

| Component | Priority | Description                                                                                                                   |
|-----------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| C1        | High     | REST API calls are exposing user email and password in the request payload (Form Data), which poses a significant security risk. |
| C1        | Medium   | No proper email domain validation. Emails with invalid formats such as `test@xyz.c`, `t@g.c`, `user<>@gmail.com` are accepted. |
| C3        | High     | User can submit income under transaction without an amount; Amount is not a mandatory field                                   |
| C3        | Medium   | Negative amount can be added as income, but under transaction you see the positive amount for the same                         |
| C3        | Medium   | Negative amounts are accepted while adding envelope, but error message shows "Use positive digits"                            |
| C3        | Low      | After new envelope creation, clicking on "Yes take me to my fills" shows no option to fill envelopes                          |
| C4        | Medium   | MobileView: Accessing any other links other than add transaction changes the layout to Browser view device                    |
| C4        | Medium   | MobileView: Hamburger menu in mobile layout is not responsive from Login/SignUp screen                                        |
| C4        | Low      | Footer is visually misaligned and appears pushed outside the intended container on "envelopes/fill-new-envelopes" screen      |
---

#### Needs Improvement ####

| Component | Description                                                                                                                     |
|-----------|---------------------------------------------------------------------------------------------------------------------------------|
| C1        | Login error messages are not clear. The same generic message is shown for both incorrect email and password, making it hard for users to identify the issue. |
| C1        | Weak passwords like `1234` are accepted. The application should enforce stronger passwords with a combination of letters, numbers, symbols, and longer length. |
| C4        | HTML document does not correctly define the character encoding, this can lead to Inconsistent rendering across browsers or devices - Identified by Lighthouse |
| C5        | The document is missing a meta description — the description text is empty. This can negatively impact search engine visibility and makes the page less accessible for users relying on assistive technologies. - Identified by Lighthouse |
| C5        | Browser Errors Logged to Console these can trigger fallback behavior. - Identified by Lighthouse                                |


### Risk to mitigate ###

**Security Risk**
exposing sensitive information  
- API is storing credentials and weak validation on email, passwords would make application vulnerable to attacks.
- Missing Secure flag in cookies can risk the application

**Usability Risks**
Address cross-browser compatibility and responsive design to ensure the app works well on all devices and browsers.
- HTML document does not correctly define the character encoding, this can lead to Inconsistent rendering across browsers or devices - Identified by Lighthouse

**Data Privacy Risk**
Exposing sensitive info via API 
- Financial apps must safeguard personal and budget data of users

**Input Validation**
Accepting invalid data (e.g., wrong amount, bad email)	
- Could cause wrong financial calculations and shows weak appication behavior (users might lose trust)

**Inresponsive Design**
Layouts not adapting to mobile screens for few pages
- Mobile users may find the app unusable and lead to loosing a potentianl user. 



