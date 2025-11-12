
describe('Pokedax Home Page', () => {
  it('deve exibir o título da Pokédex e navbar', () => {
    cy.visit('/');
    cy.get('img[alt="Pokedax Logo"]').should('be.visible');
    cy.get('nav').should('exist');
  });

  it('deve exibir uma lista de pokémons', () => {
    cy.visit('/');
    cy.get('.pokemon-card').should('have.length.greaterThan', 0);
  });

  it('deve abrir o modal ao clicar em um pokémon', () => {
    cy.visit('/');
    cy.get('.pokemon-card').first().click();
    cy.get('.modal-content', { timeout: 10000 })   // aumenta o tempo de espera
    .should('be.visible');
    cy.contains('About').should('be.visible');
  });

});
