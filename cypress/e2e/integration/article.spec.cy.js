describe('Article Page', () => {
  it('Loads an article successfully', () => {
    cy.visit('/articles/1750103'); // Substitua "your-article-id" pelo ID real do seu artigo

    cy.get('h2').should('exist'); // Verifica se o título existe
    cy.get('p').should('exist'); // Verifica se pelo menos um parágrafo existe
  });
});
