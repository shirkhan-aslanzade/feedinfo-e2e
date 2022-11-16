///<reference types = "Cypress" />
import LoginPage from "../support/pageObjects/loginPage";
const { includes } = require("lodash");
const loginPage = new LoginPage();

describe("Login functionality, Negative test cases", function () {
  beforeEach(function () {
    cy.fixture("login.json").then(function (data) {
      this.login = data;
    });
    cy.visit(Cypress.env("loginURL"));
  });
  it("User provides wrong credentials", function () {
    loginPage.getEmailBox().type(this.login.wrongEmail);
    loginPage.getPasswordBox().type(this.login.wrongPassword);
    loginPage.getSubmitButton().click();
    loginPage.getPage().should("contain.text", "Login was unsuccessful");
  });

  it("Wrong Email Format", function () {
    cy.login("wrongEmailFormat", "justPassword"); // The customized login(email, password) function is used here.
    loginPage.getPage().should("include.text", "is not a valid e-mail address");
  });

  it("Leaving email and password fields empty", function () {
    loginPage.getSubmitButton().click();
    loginPage
      .getPage()
      .should("include.text", "The Login field is required")
      .and("include.text", "The Password field is required.");
  });

  it("User writes a wrong email in the Reset Password page", function () {
    loginPage.getForgottenPassword().click();
    loginPage.getEmailBox().type(this.login.wrongEmail);
    loginPage.getSubmitButton().click();
    loginPage
      .getPage()
      .should("include.text", "User with this email could not be found");
  });
});
