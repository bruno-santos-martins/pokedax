
describe('Página Sobre', () => {
  it('deve exibir o título e seções principais', () => {
    cy.visit('/sobre');
    cy.contains('Sobre').should('be.visible');
    cy.contains('Visão Geral').should('be.visible');
    cy.contains('Arquitetura').should('be.visible');
    cy.contains('Fluxo de Dados').should('be.visible');
    cy.contains('Stack').should('be.visible');
  });

  it('deve exibir o menu de navegação', () => {
    cy.visit('/sobre');
    cy.get('nav').should('exist');
    cy.contains('Home').should('be.visible');
    cy.contains('Sobre').should('be.visible');
  });
});
