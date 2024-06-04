import loginPage from "../pages/loginPage";

// test suite for Login page 

describe("Login Suite", () => {
  // object for loginPage
  const loginpage = new loginPage();

  //closure/variable to use fixture data
  let data;

  //supporting hook to prepare for the test
  beforeEach(() => {
    cy.visit("https://app.qa.nesto.ca/login");

    //declare the fixture file and use save in closure
    cy.fixture("logindata").then((fdata) => {
      data = fdata;
    });

    //check for any uncaught exception
    cy.on("uncaught:exception", (e) => {
      //in current situation application is throwing this error so we ignore it
      if (e.message.includes("Cannot read properties of undefined")) {
        return false;
      }
      // on any other error message the test fails
    });
  });

  // test case #1
  it("Verify error on empty username & password values", () => {
    //clear values from email input box
    loginpage.getEmailInput().clear();
    //clear values from password input box
    loginpage.getPasswordInput().clear();
    //click on submit
    loginpage.getSubmit().click();

    //verify email input throws validation error
    cy.get(".eZkqhv > :nth-child(1) > .sc-hKFxyN").should(
      "have.text",
      "Required"
    );

    //verify password input throws validation error
    cy.get(".hHUsYj > .sc-hKFxyN > #validation_errors_isRequired").should(
      "have.text",
      "Required"
    );
  });

  //test case #2
  it("Verify invalid Email address error", () => {
    //Clear and type invalid email address
    loginpage.getEmailInput().clear().type(data.emailInvalid);
    // Clear and type valid password
    loginpage.getPasswordInput().clear().type(data.passwordValid);
    //Click on Submit
    loginpage.getSubmit().click();

    // verify the invalid email error
    cy.get("#validation_errors_invalidEmail").should(
      "have.text",
      "Invalid email address"
    );
  });

  // test case #3
  it("Verify user can login with correct credentials", () => {
    //Clear and type correct email address
    loginpage.getEmailInput().clear().type(data.emailValid);
    //Clear and type correct password
    loginpage.getPasswordInput().clear().type(data.passwordValid);
    //Click on Submit
    loginpage.getSubmit().click();

    // Verify user is landed on Dashboard
    cy.get("#dashboard_welcomeBack").should("have.text", "Welcome back");
  });

  //test case #4
  it("Verify user can not login with incorrect credentials", () => {
    //Clear and type valid email address
    loginpage.getEmailInput().clear().type(data.emailValid);
    //Clear and type valid password
    loginpage.getPasswordInput().clear().type(data.passwordInvalid);
    //Click on submit
    loginpage.getSubmit().click();

    //Verify the toast message for invalid credentials shows up
    cy.get("#toasts_invalidPassword_title").should(
      "have.text",
      "Your email and/or your password is invalid."
    );
  });

  // test case #5
  it("Verify forgot password link works", () => {
    // Click on forgot password link
    loginpage.getForgotpasswordLink().click();
    //Verify the title of the Form
    cy.get("#form_resetPassword_titleTop").should(
      "have.text",
      "Password assistance"
    );
  });

  // test case #6
  it("Verify signup link works", () => {
    // Click on singup link
    loginpage.getSignupLink().click();
    //verify singup form title
    cy.get("#form_signup_title").should("have.text", "Create a nesto account");
  });
});
