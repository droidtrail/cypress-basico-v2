/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('src/index.html')
    });

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('teste@teste.com') 
        cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos',{ delay:0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('testeteste.com') 
        cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });

    it('Validar campo telefone vazio quando um texto for digitado ', () => {
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('testeteste.com') 
        cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });

    it.only('Exibir mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').click() 
        cy.get('#phone').type('texto')
        cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });
})
