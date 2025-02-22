/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THERE_SECONDS_IN_MS = 3000
    beforeEach(() => {
        cy.visit('src/index.html')
    });

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos', { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THERE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('testeteste.com')
        cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THERE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    Cypress._.times(5, function () {
        it('Validar campo telefone vazio quando um texto for digitado ', () => {
            cy.get('#firstName').type('Leandro')
            cy.get('#lastName').type('Pereira')
            cy.get('#email').type('testeteste.com')
            cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos')
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
        });
    })

    it('Exibir mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#phone').type('texto')
        cy.get('#open-text-area').type('8. Digitando em campos e clicando em elementos')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THERE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('Preencher e limpar os campos Nome, Sobrenome, Email e Telefone', () => {
        cy.get('#firstName')
            .type('Leandro')
            .should('have.value', 'Leandro')
            .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Pereira')
            .should('have.value', 'Pereira')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('977778888')
            .should('have.value', '977778888')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('8. Digitando em campos e clicando em elementos')
            .should('have.value', '8. Digitando em campos e clicando em elementos')
            .clear()
            .should('have.value', '')
        cy.contains('button', 'Enviar').click()
        cy.get('.error')
            .should('be.visible')
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THERE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THERE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[name="atendimento-tat"][value="feedback"]')
            .check()
            .should('be.checked')
            .should('have.value', 'feedback')
    });

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio)
                    .check()
                    .should('be.checked')
            })
    });

    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/img/cypress.png')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('cypress.png')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/img/cypress.png')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('cypress.png', { action: 'drag-drop' })
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json', { action: 'drag-drop' })
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    });

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const {status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    });

    it.only('encontra o gato escondido', () => {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')

        cy.get('#title')
            .invoke('text','CAT TAT')

        cy.get('#subtitle')
            .invoke('text','Eu 💚 gatos')
    });

})
