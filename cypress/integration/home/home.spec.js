describe("Home Page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains recipe heading with a message that there are no recipes", () => {
        cy.get('.App-header').should('contain', "My Recipes")
        cy.get('p').should('contain', "There are no recipes to list.")
    })
    it("contains an add recipe button that when clicked opens a form", () => {
        const addRecipeButton = cy.get('#add-recipe')
        addRecipeButton.click()
      
        expect(cy.get('#recipe-form')).to.exist
    })
    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        const addRecipeButton = cy.get('#add-recipe')
        addRecipeButton.click()
      
        expect(cy.get('input[name="newRecipeName"]')).to.exist
        expect(cy.get('textarea[name="newRecipeInstructions"]')).to.exist
    })
    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        const addRecipeButton = cy.get('#add-recipe')
        addRecipeButton.click().then(() => {  
          cy.get('input[name="newRecipeName"]').type("Tofu Scramble Tacos")
          cy.get('textarea[name="newRecipeInstructions"]').type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
          cy.get('input[type="submit"]').click()
          cy.get('ul').then(() => { 
            cy.get('ul').contains("Tofu Scramble Tacos")
          }) 
        }) 
    })
})