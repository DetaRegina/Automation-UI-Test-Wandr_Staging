describe('Activities Landing Page', () => {
  beforeEach( () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/activities')
  })
  
  it('The hero image is displayed', () => {
    cy.get('[class="t-hero-main-background"]')
      .should('have.attr', 'style', 'background-image: url("https://img.trvcdn.net/https://static.trvcdn.net/shared/assets/images/activities-hero.jpg?imgeng=m_box/w_2850/h_1220");')
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
    // Click the options in the Destinations Suggestion => New Zealand
    cy.get('.t-input-dropdown > :nth-child(1)')
      .click()
    // The Destinations Suggestion is not displayed
    cy.get('.t-input-dropdown')
      .should('not.exist')
    // The destination chosen is displayed in the search bar
    cy.get('#activitiesSearchDestination')
      .should('have.value', 'New Zealand')
    // The button is active
    cy.get('[data-gtm-event="ev_activities_search_clicksearchbutton"]')
      .should('have.text', '\n      Search Activities\n    ')
      .and('be.enabled')
      .click()
    cy.url().should('include', 'search?q=New%20Zealand&qtype=destination&sort=recommended')
  })

  it('Search with Destinations', () => {
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
  })

  it('Search with Activity', () => {
    // The search displayed the placeholder
    cy.get('#activitiesSearchDestination')
      .type('atv single')
    // The activity icon is display in the Suggestion
    cy.get('[class="t-icon t-m-r-8 icon-activity"]')
      .should('be.visible')
    // Click the options in the Activity Suggestion => ATV Single & Zip Line from Cancun
    cy.get('.t-input-dropdown > :nth-child(3)')
      .click()
    // The Activity chosen is displayed in the search bar
    cy.get('#activitiesSearchDestination')
      .should('have.value', 'ATV Single & Zip Line from Cancun')
    // Click the 'Search'button
    cy.get('[data-gtm-event="ev_activities_search_clicksearchbutton"]')
      .click()
    cy.url().should('include', '/search?q=ATV%20Single%20%26%20Zip%20Line%20from%20Cancun&qtype=listing&sort=recommended')
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
      .click()
    // Ensure the search bar is clear
    cy.get('#activitiesSearchDestination')
      .should('have.value', '')
  })

  it('Blank Search', () => {
    // Leave the search bar empty
    // Click the 'Search'button
    cy.get('[data-gtm-event="ev_activities_search_clicksearchbutton"]')
      .click()
    // The 'Search' button is inactive
    cy.get('[data-gtm-event="ev_activities_search_clicksearchbutton"]')
      .should('have.css', 'opacity', '0.8')
  })

  it('Search not found', () => {
    // The search displayed the placeholder
    cy.get('#activitiesSearchDestination')
      .type('QWERTY')
    // The message is displayed
    cy.get('.t-input-dropdown__empty')
      .should('be.visible')
      .and('have.text', '\n            Your search did not match any result please try again.\n          ')
    // Click the 'Search'button
    cy.get('[data-gtm-event="ev_activities_search_clicksearchbutton"]')
      .click()
    cy.wait(3000)
    cy.url().should('include', 'search?q=QWERTY&sort=recommended')
    cy.get('.t-alert-alt-text')
      .should('have.text', 'Sorry, we\'re unable to find any activities. Try to select one of the suggestions below.')
  })

  it('Essential picks', () => {
    cy.get('.trv-activities-landing-page-section-essential-pick > .c-section-title > :nth-child(1) > .t-heading-2')
      .should('have.text', '\n      Essential picks\n    ')
    // Ensure the cards are displayed
    cy.get('.trv-activities-landing-page-section-essential-pick > .t-cards-wrapper')
      .should('be.visible')
  })

  it('Essential picks card', () => {
    cy.get('[class="c-image t-position-relative t-h-100 t-w-100"]')
      .should('exist')
      .and('be.visible')
    // Ensure the activity name in the cards are displayed
    cy.get('[class="t-heading-5 t-ellipsis-2-line t-color-grey-darkest"]')
      .should('exist')
      .and('be.visible')
    // Ensure the activity location in the cards are displayed
    cy.get('.t-card-content-body > .t-card-content-body-title > .t-card-content-footer-left-location')
      .should('exist')
      .and('be.visible')
    // Ensure the activity price in the cards are displayed
    cy.get('.t-card-content-footer > .t-card-content-footer-right > :nth-child(2) > .t-heading-5')
      .should('exist')
      .and('be.visible')
    // Ensure the activity VIP price in the cards are displayed
    cy.get('[class="t-m-t-4 t-m-b-4 c-product-price-comparison t-display-flex t-items-center t-justify-flex-start t-m-t-4"]')
      .should('be.visible')
      .and('have.attr', 'style', 'color: rgb(245, 172, 121);')
    cy.get('[class="t-body-text t-m-r-4 t-m-l-4"]')
      .should('exist')
      .and('be.visible')
  })

  it('Button More in the Essential Pick', () => {
    // Button More in the Essential Pick is displayed
    cy.get('[class="t-heading-5 t-color-secondary t-hidden-mobile"]')
      .eq(0)
      .should('be.visible')
      .click()
    // Button More is redicrect to search page
    cy.url().should('include', '/search?q=Australia&qtype=destination&sort=recommended')
  })

  it('Top destinations', () => {
    cy.get('.trv-activities-landing-page-section-top-destination')
      .should('be.visible')
    // Ensure the activity name in the cards are displayed
    cy.get('[class="t-heading-2 t-color-grey-darkest"]')
      .contains('Top destination')
      .should('be.visible')
    // Ensure the activity card location are displayed
    cy.get('[class="t-col-4 t-col-tab-4 t-col-mobile-12"]')
      .should('exist')
      .and('be.visible')
    // Ensure the activity image in the cards are displayed
    cy.get('[class="t-card-background t-card-large-center-title-image-handler image--loaded"]')
      .should('exist')
      .and('be.visible')
    // Ensure the activity destination title in the cards are displayed
    cy.get('[class="t-heading-2 t-hyphens"]')
      .should('be.visible')
    // Ensure the activity image in the cards are displayed
    cy.get('[class="t-card-title-content-description t-heading-6 t-m-t-15 t-display-inline-block"]')
      .should('exist')
      .and('be.visible')
  })

  it('Button More in the Top destinations', () => {
    // Button More in the Top destinations is displayed
    cy.get('[class="t-heading-5 t-color-secondary t-hidden-mobile"]')
      .eq(1)
      .should('be.visible')
      .click()
    // Button More is redicrect to search page
    cy.url().should('include', '/search?q=Australia&qtype=destination&sort=recommended')
  })
})