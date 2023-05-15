
const ODYSSEY_USERNAME = "louis.grignon@wildcodeschool.com"; 
const ODYSSEY_PASS = "??????"; 

function loginToOdyssey() {
  cy.visit('https://odyssey.wildcodeschool.com')
  cy.get('[class$="formInputs"] input[name="email"]').type(ODYSSEY_USERNAME);
  cy.get('[class$="formInputs"] input[name="password"]').type(ODYSSEY_PASS);
  cy.contains("Je me connecte").click() 

  // wait for login to complete, and left menu to be visible
  cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
}

function openOdysseyPageFromMenu(itemName: string) {
  return cy.get('[role="button"]').contains(itemName).click()
}

describe.only('Search quest on Odyssey', () => {
  it('Search quest in Odyssey', () => {
    loginToOdyssey();

    openOdysseyPageFromMenu("Quêtes");
    
    cy.get('[class$="searchField"] input[type="text"]').type('Angular');
    cy.get('button[class$="searchButton"]').click();    

    cy.contains('Voir la quête').click()
    // assert that opened page has correct content
    cy.contains(`Introduction`, { timeout: 10000 }).should('be.visible');
  })
  it('Search coworker in Odyssey', () => {
    loginToOdyssey();
    
    openOdysseyPageFromMenu("Ma Promo");
    cy.contains("William Bouet").parent('[class$="userContent"]').prev().click()

    // assert that opened page has correct content
    cy.contains(`Formation développeur d'applications en alternance`, { timeout: 10000 }).should('be.visible');
  })
})