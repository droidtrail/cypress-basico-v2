Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Leandro')
    cy.get('#lastName').type('Pereira')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
})