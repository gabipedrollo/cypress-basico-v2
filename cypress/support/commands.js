Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {

    cy.get('#firstName').type('Gabriela')
    cy.get('#lastName').type('Pedrollo')
    cy.get('#email').type('gabriela@exemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

})