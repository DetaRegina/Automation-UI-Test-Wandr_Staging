describe('Activities Search Page', () => {
  beforeEach( () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/activities/search')
  })
  
  it('Search with Destinations Suggestion', () => {
    // The search displayed the placeholder
    cy.get('#activitiesSearchDestination')
      .should('have.attr', 'placeholder', 'Search by destination or activity type')
      .click()
    // Ensure the Destinations Suggestion is displayed
    cy.get('.t-input-dropdown')
      .should('exist')
      .and('be.visible')
    cy.get('[class="t-input-dropdown__item t-w-100"]')
      .should('have.length', 3)
    // Click the options in the Destinations Suggestion => Indonesia
    cy.get('.t-input-dropdown > :nth-child(1)')
      .click()
    // The Destinations Suggestion is not displayed
    cy.get('.t-input-dropdown')
      .should('not.exist')
    // The destination chosen is displayed in the search bar
    cy.get('#activitiesSearchDestination')
      .should('have.value', 'Indonesia')
    // The button is active
    cy.get('.t-container > .c-location > .t-form > .t-btn')
      .should('have.text', '\n      Search Activities\n    ')
      .and('be.enabled')
      .click()
    cy.url().should('include', '?q=Indonesia&qtype=destination&sort=recommended')
  })

  it('Search with Destinations', () => {
    // Type 'new zealand'
    cy.get('#activitiesSearchDestination')
      .type('new zealand')
    cy.wait(5000)
    // Ensure the Suggestion is displayed and has 6 suggestion
    cy.get('.t-input-dropdown')
      .should('exist')
    cy.get('[class="t-input-dropdown__item t-w-100"]')
      .should('have.length', 6)
    // The destionation icon is display in the Suggestion
    cy.get('[class="t-icon t-m-r-8 icon-location"]')
      .should('be.visible')
    // Click the options in the Destinations Suggestion => New Zealand
    cy.get('.t-input-dropdown > :nth-child(1)')
      .click()
    // The destination chosen is displayed in the search bar
    cy.get('#activitiesSearchDestination')
      .should('have.value', 'New Zealand')
    // Click the 'Search'button
    cy.get('.t-container > .c-location > .t-form > .t-btn')
      .click()
    cy.url().should('include', '?q=New%20Zealand&qtype=destination&sort=recommended')
  })

  it('Search with Activity', () => {
    // The search displayed the placeholder
    cy.get('#activitiesSearchDestination')
      .type('atv single')
    // The activity icon is display in the Suggestion
    cy.get('[class="t-icon t-m-r-8 icon-activity"]')
      .should('be.visible')
    // Click the options in the Activity Suggestion => ATV Single & Zip Line from Cancun
    cy.get('.t-input-dropdown > :nth-child(4)')
      .click()
    // The Activity chosen is displayed in the search bar
    cy.get('#activitiesSearchDestination')
      .should('have.value', 'ATV Single & Zip Line')
    // Click the 'Search'button
    cy.get('.t-container > .c-location > .t-form > .t-btn')
      .click()
    cy.url().should('include', '?q=ATV%20Single%20%26%20Zip%20Line&qtype=listing&sort=recommended')
  })

  it('Clear button', () => {
    // Type 'new zealand'
    cy.get('#activitiesSearchDestination')
      .type('new zealand')
    // The Clear button is displayed
    cy.get('.icon__clear')
      .should('be.visible')
    // Click the options in the Destinations Suggestion => New Zealand
    cy.get('.t-input-dropdown > :nth-child(1)')
      .click()
    // Click the Clear button to clear the search
    cy.get('.icon__clear')
      .first()
      .click()
    // Ensure the search bar is clear
    cy.get('#activitiesSearchDestination')
      .should('have.value', '')
  })

  it('Blank Search', () => {
    // Leave the search bar empty
    // Click the 'Search'button
    cy.get('.t-container > .c-location > .t-form > .t-btn')
      .click()
    // The 'Search' button is inactive
    cy.get('[class="t-btn t-btn-primary"]')
      .should('have.css', 'opacity', '0.8')
  })

  it('Sort', () => {
    // The default sort is Reccommeded
    cy.get('.t-tabs-item')
      .eq(0)
      .should('have.class', 'active')
    // Click the Lowest Price sort
    cy.contains('[class="t-tabs-link"]', 'Lowest Price')
      .click()
    cy.contains('[class="t-tabs-link"]', 'Lowest Price')
      .parent()
      .should('have.class', 'active')
    // The Reccommended sort is not active
    cy.get('.t-tabs-item')
      .eq(0)
      .should('not.have.class', 'active')
  })

  it('Search Result', () => {
    // Type 'new zealand'
    cy.get('#activitiesSearchDestination')
      .type('new zealand')
    cy.wait(5000)
    // Click the options in the Destinations Suggestion => New Zealand
    cy.get('.t-input-dropdown > :nth-child(1)')
      .click()
    // Click the 'Search'button
    cy.get('.t-container > .c-location > .t-form > .t-btn')
      .click()
    cy.wait(5000)
    // Ensure the result is 30 in one page
    cy.get('[class="t-col-4 t-col-mobile-12 t-col-tab-6"]')
      .should('have.length', 30)
  })


  it('Activity Type Filter', () => {
    // The Filter Activtiy Type is displayed
    cy.contains('[class="t-panel-header-title"]', 'Activity Type')
      .parent() 
      .should('have.class', 'active')
    // The button 'View All' is displayed
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(4) > .c-panel > .t-panel-body > .t-m-t-24 > .t-btn > .t-color-primary')
      .should('contain', 'View all')
      .and('be.visible')
      .click()
    // 'View less' button is working
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(4) > .c-panel > .t-panel-body > .t-m-t-24 > .t-btn > .t-color-primary')
      .should('contain', 'View less')
      .click()
    // 'View less' button change into 'View all' button
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(4) > .c-panel > .t-panel-body > .t-m-t-24 > .t-btn > .t-color-primary')
      .should('contain', 'View all')
      .and('be.visible')
  })

  it('Destination Filter', () => {
    // The Filter Activtiy Type is displayed
    cy.contains('[class="t-panel-header-title"]', 'Destination')
      .parent() 
      .should('have.class', 'active')
    // The button 'View All' is displayed
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(7) > .c-panel > .t-panel-body > .t-m-t-24 > .t-btn > .t-color-primary')
      .should('contain', 'View all')
      .and('be.visible')
      .click()
    // 'View less' button is working
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(7) > .c-panel > .t-panel-body > .t-m-t-24 > .t-btn > .t-color-primary')
      .should('contain', 'View less')
      .click()
    // 'View less' button change into 'View all' button
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(7) > .c-panel > .t-panel-body > .t-m-t-24 > .t-btn > .t-color-primary')
      .should('contain', 'View all')
      .and('be.visible')
  })

  it('Open and close the Filter', () => {
    // Click the Activity Type title to close the filter body
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(4) > .c-panel > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Activity Type')
      .parent() 
      .should('not.have.class', 'active')
    // Open again the filter
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(4) > .c-panel > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Activity Type')
      .parent() 
      .should('have.class', 'active')
    // Click the Price title to close the filter body
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(5) > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Price')
      .parent() 
      .should('not.have.class', 'active')
    // Open again the filter
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(5) > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Price')
      .parent() 
      .should('have.class', 'active')
    // Click the Duration title to close the filter body
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(6) > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Duration')
      .parent() 
      .should('not.have.class', 'active')
    // Open again the filter
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(6) > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Duration')
      .parent() 
      .should('have.class', 'active')
    // Click the Destination title to close the filter body
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(7) > .c-panel > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Destination')
      .parent() 
      .should('not.have.class', 'active')
    // Open again the filter
    cy.get('.t-col-3 > .c-left-filter > .t-form > :nth-child(7) > .c-panel > .t-panel-header')
      .click()
    cy.contains('[class="t-panel-header-title"]', 'Destination')
      .parent() 
      .should('have.class', 'active')
  })

  it('Input the Price Filter', () => {
    cy.get('#minRange')
      .click()
      .clear()
      .type(1000)
    cy.get('#minRange')
      .should('have.value', '1000')
    cy.get('#maxRange')
      .click()
      .clear()
      .type(1000000)
    cy.get('#maxRange')
      .should('have.value', '1000000')
  })
})