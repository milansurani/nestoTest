// class for login page elements

class loginPage {
  //get and return Email input web element
  getEmailInput() {
    return cy.get("#email");
  }

  //get and return Password input web element
  getPasswordInput() {
    return cy.get("#password");
  }

  //get and return forgot password link web element
  getForgotpasswordLink() {
    return cy.get("#form_signup_forgotPassword");
  }

  //get and return forgot signup link web element
  getSignupLink() {
    return cy.get("#loginPage_signUp > span");
  }

  // get and return submit button
  getSubmit() {
    return cy.get(".kfpPlD > .sc-jSFjdj");
  }
}

export default loginPage;
