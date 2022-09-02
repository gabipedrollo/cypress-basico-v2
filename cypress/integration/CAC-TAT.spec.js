/// <reference types="Cypress" />

//describe: suíte de testes it:casos de teste

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {

        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {



        //verificação se o título corresponde
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, teste, teste, teste, Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,Teste, teste, teste, teste,'
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Pedrollo')
        cy.get('#email').type('gabriela@exemplo.com')

        //propriedade delay com valor 0 para o teste rodar mais rápido (no caso o texto a ser inserido era longo)
        cy.get('#open-text-area').type(longText, ({ delay: 0 }))
        cy.contains('button', 'Enviar').click()

        //asserção pra confirmar a mensagem "mensagem enviada com sucesso"
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Pedrollo')
        cy.get('#email').type('gabrielaexemplo.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preechido com valor não-numérico', function () {

        cy.get('#phone')
            .type('abcdef')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Pedrollo')
        cy.get('#email').type('gabriela@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Gabriela')
            .should('have.value', 'Gabriela')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Pedrollo')
            .should('have.value', 'Pedrollo')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('gabriela@exemplo.com')
            .should('have.value', 'gabriela@exemplo.com')
            .clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit() //custom commands

        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function () {

        cy.get('#product')
            .select('YouTube') //seletor de opções em caixa suspensa
            .should('have.value', 'youtube')


    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {

        cy.get('#product')
            .select('mentoria') //seletor de opções em caixa suspensa
            .should('have.value', 'mentoria')


    })

    it('seleciona um produto (Blog) por seu índice', function () {

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')

    })

    it.only('marca cada tipo de atendimento', function () {

        cy.get('input[type="radio"]') //retorna os 3 elementos radio
            .should('have.length', 3) //confirmação que são 3 elementos
            .each(function($radio){ // passa por cada um dos elementos
                cy.wrap($radio).check() //marcar os 3
                cy.wrap($radio).should('be.checked') //confirmação que os 3 foram marcados

            })

    })

    
})