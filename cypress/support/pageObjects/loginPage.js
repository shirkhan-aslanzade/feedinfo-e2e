class LoginPage {
  getEmailBox() {
    return cy.get("input[name='Login']");
  }
  getPasswordBox() {
    return cy.get("input[name = 'Password]");
  }
  getSubmitButton() {
    return cy.contains("SUBMIT").click();
  }
  getPage() {
    return cy.get("body");
  }
  getForgottenPassword() {
    return cy.contains("Forgotten password");
  }
}
export default LoginPage;
