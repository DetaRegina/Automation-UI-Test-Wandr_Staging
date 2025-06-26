describe('Activity Booking', () => {
  it('Book from Landing Page', () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/activities')
    // Search 'Australi' in the search bar
    // Type 'new zealand'
    cy.get('#activitiesSearchDestination')
      .type('new zealand')
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
    cy.get('[data-gtm-event="ev_activities_search_clicksearchbutton"]')
      .click()
    cy.url().should('include', 'search?q=New%20Zealand&qtype=destination&sort=recommended')
    // Search Page
    // The destination chosen is displayed in the search bar
    cy.get('#activitiesSearchDestination')
      .should('have.value', 'New Zealand')
    // Click the activity card
    cy.get('[class="t-col-4 t-col-mobile-12 t-col-tab-6"]')
      .eq(2)
      .click()
    cy.url().should('include', 'activities/detail')
    // Detail Page
    // Click the 'See Option' button
    cy.get('#activityHeadlinePrice > .t-text-align-right > .t-btn')
      .click()
    // Click the Date field to display the date body
    cy.get('.el-date-editor')
      .click()
    cy.get('.el-picker-panel__body')
      .should('be.visible')
    // Pick the Date
    cy.get('.el-icon-arrow-right')
      .click() // Click arrow to display the next month
    cy.get('.el-date-table > tbody > :nth-child(3) > :nth-child(3) > div')
      .click() // Choose the Date
    // Click the guest field to display the guest counter form
    cy.get('.t-input-icon-group')
      .click()
    // Add the number of guest
    cy.get('[class="el-input-number__increase"]')
      .first()
      .click()
      .click()
    // Click 'Apply' button
    cy.get('#dropdownGuestCounter > .t-btn')
      .should('be.enabled')
      .click()
    // System load
    cy.wait(2000)
    // The 'Book Now' is displayed
    cy.get(':nth-child(2) > :nth-child(1) > .t-display-table > .t-text-align-right > .t-flex-direction-column-mobile > .t-p-l-16 > .t-btn')
      .should('contain', 'Book Now')
      .click()
    // Redirect to Login page
    cy.origin('https://accounts.freya.travlr.com', () => {
      cy.url().should('include', '/login')
    })
  })
})