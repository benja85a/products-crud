/// <reference types="cypress" />

describe('Products Page E2E', () => {
  const baseUrl = 'http://localhost:5173'; // Cambia si tu frontend corre en otro puerto

  it('Carga productos y filtra por búsqueda', () => {
    // 1️⃣ Abrir la página
    cy.visit(baseUrl);

    // 2️⃣ Verificar que al menos un producto se carga
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);

    // 3️⃣ Escribir en el buscador
    cy.get('[data-testid="search-input"]').type('Laptop');

    // Esperar que al menos 1 producto con Laptop aparezca
    cy.get('[data-testid="product-card"]').should('contain.text', 'Laptop');
  });
});
