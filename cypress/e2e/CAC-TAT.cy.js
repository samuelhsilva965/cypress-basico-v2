/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(()=> cy.visit('./src/index.html'))

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, felis nec sodales elementum, risus est venenatis tortor, non egestas nisi ligula nec mauris. Donec et risus a odio condimentum tincidunt. Vestibulum in nibh eu urna volutpat faucibus. Vivamus egestas enim ut felis fringilla, non venenatis justo pretium. Aenean convallis risus nec tortor aliquam, at ullamcorper purus bibendum. Nam tristique sapien a risus finibus, non rutrum metus luctus. Phasellus vehicula nisi ac nisi pharetra, sit amet sodales erat hendrerit. Nullam at orci at eros fermentum interdum. Ut euismod enim sit amet purus sodales, ac sagittis turpis scelerisque.'
    cy.get('#firstName')
    .should('be.visible')
    .type('Samuel')
    .should('have.value', 'Samuel')

    cy.get('#lastName')
    .should('be.visible')
    .type('Henrique')
    .should('have.value', 'Henrique')

    cy.get('#email')
    .should('be.visible')
    .type('teste@gmail.com')
    .should('have.value', 'teste@gmail.com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type(longText, {delay: 0})
    .should('have.value', longText)

    cy.contains('button', 'Enviar')
    .should('be.visible')
    .click()

    cy.contains('.success', 'Mensagem enviada com sucesso')
    .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.exibeMensagemErroEmailInvalido()
  })

  it('Validar uso de valores não-númericos no campo de telefone', () => {
    cy.get('#phone')
      .type('Valor não númerico')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, felis nec sodales elementum, risus est venenatis tortor, non egestas nisi ligula nec mauris. Donec et risus a odio condimentum tincidunt. Vestibulum in nibh eu urna volutpat faucibus. Vivamus egestas enim ut felis fringilla, non venenatis justo pretium. Aenean convallis risus nec tortor aliquam, at ullamcorper purus bibendum. Nam tristique sapien a risus finibus, non rutrum metus luctus. Phasellus vehicula nisi ac nisi pharetra, sit amet sodales erat hendrerit. Nullam at orci at eros fermentum interdum. Ut euismod enim sit amet purus sodales, ac sagittis turpis scelerisque.'
    cy.get('#firstName')
      .should('be.visible')
      .type('Samuel')
      .should('have.value', 'Samuel')

    cy.get('#lastName')
      .should('be.visible')
      .type('Henrique')
      .should('have.value', 'Henrique')

    cy.get('#email')
      .should('be.visible')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')

    cy.get('#phone-checkbox')
      .check()

    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText, {delay: 0})
      .should('have.value', longText)

    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()

    cy.contains('.error', 'Valide os campos obrigatórios!')
      .should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .should('be.visible')
      .type('Samuel')
      .should('have.value', 'Samuel')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .should('be.visible')
      .type('Henrique')
      .should('have.value', 'Henrique')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .should('be.visible')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('90000000')
      .should('have.value', '90000000')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()

    cy.contains('.error', 'Valide os campos obrigatórios!')
      .should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.contains('.success', 'Mensagem enviada com sucesso')
    .should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[name="atendimento-tat"]')
      .check('feedback')
      .should('have.value', 'feedback')
  })
  
  it('marca cada tipo de atendimento', () => {
    cy.get('[name="atendimento-tat"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=checkbox]')
      .should('have.length', 2)
      .each(($checkbox) => {
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
        
      })
      .last().uncheck()
      
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.UploadArquivo()

  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input) => {
          expect($input[0].files[0].name).to.equal('example.json')
        })
  }) 

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()

    cy.contains('Talking About Testing').should('be.visible')
  })
})

