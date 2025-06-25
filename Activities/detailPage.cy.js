describe('Activities Detail Page', () => {
  beforeEach( () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/activities/detail/private-customizable-bali-tour-visit-with-transfer-included?p=1&c=456401P1')
  })
  
  it('Activity Image', () => {
    cy.get('.c-hero-slider')
      .should('be.visible')
  })

  it('Activity Description', () => {
    // The activity name is displayed
    cy.get('.t-heading-3')
      .should('be.visible')
    // The activity description is displayed
    cy.get('.collapsible__content > .t-body-text')
      .should('be.visible')
  })

  it('Activity Price', () => {
    // The activity price section is displayed
    cy.get('#activityHeadlinePrice')
      .should('be.visible')
    // The activity price is displayed
    cy.get('.t-text-align-left > .t-heading-4')
      .should('be.visible')
    // The activity strikthrough price is displayed
    cy.get('.t-text-align-left > div > .t-heading-5')
      .should('be.visible')
  })

  it('Activity Duration', () => {
    // The 'Duration' is displayed
    cy.get('.t-m-t-26 > .t-p-r-32')
      .should('be.visible')
    // The duration icon is displayed
    cy.get('.t-m-t-26 > .t-icon')
      .should('be.visible')
    // The activity duration is displayed
    cy.get('.t-m-t-26 > .t-body-text')
      .should('be.visible')
  })

  it('Activity Pick Up', () => {
    // The 'Pick Up' is displayed
    cy.get('.t-m-t-16 > .t-p-r-32')
      .should('be.visible')
    // The Pick Up icon is displayed
    cy.get('.t-m-t-16 > .t-icon')
      .should('be.visible')
    // The activity Pick Up is displayed
    cy.get('.t-m-t-16 > .t-body-text')
      .should('be.visible')
  })

  it('See Option button in Activity Description', () => {
    // The 'See Option' button is active
    cy.get('#activityHeadlinePrice > .t-text-align-right > .t-btn')
      .should('be.enabled')
      .click()
    // The 'See Option' button is jump to the activity available section
    cy.get('#packageOptions')
      .scrollIntoView()
      .should('be.visible')
  })

  it('Pick Activities Date', () => {
    // The 'See Option' button is active
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
    cy.get('tbody > :nth-child(3) > :nth-child(7) > div')
      .click() // Choose the Date
    // The date body is not displayed
    cy.get('.el-picker-panel__body')
      .should('not.be.visible')
    // Click 'Update Availability' button
    cy.get('#activitiesSearchButton')
      .should('be.enabled')
      .click()
    // System load
    cy.get('.t-ajax-loader')
      .should('be.visible')
  })

  it('Pick Activities Guest', () => {
    // The 'See Option' button is active
    cy.get('#activityHeadlinePrice > .t-text-align-right > .t-btn')
      .click()
    // Click the guest field to display the guest counter form
    cy.get('.t-input-icon-group')
      .click()
    cy.get('#dropdownGuestCounter')
      .should('be.visible')
    // The default number of adult is 2
    cy.get('[class="el-input__inner"]')
      .eq(1)
      .should('have.value', 2)
    // Reduce the number of guest
    // The min button is active, then click to decrease the number
    cy.get('[class="el-input-number__decrease"]')
      .click()
      .click()
    // The value of adult is 0
    cy.get('[class="el-input__inner"]')
      .eq(1)
      .should('have.value', 0)
    // The min button is disabled
    cy.get('[class="el-input-number__decrease is-disabled"]')
      .should('exist')
    // Add the number of guest
    // The plus button is active, then click to decrease the number
    cy.get('[class="el-input-number__increase"]')
      .click() 
    // The value of adult is 2
    cy.get('[class="el-input__inner"]')
      .eq(1)
      .should('have.value', 1)
    // The min button is active
    cy.get('[class="el-input-number__decrease"]')
      .should('not.have.class', 'is-disabled')
    // Click 'Apply' button
    cy.get('#dropdownGuestCounter > .t-btn')
      .should('be.enabled')
      .click()
    // The guets counter form is not displayed
    cy.get('#dropdownGuestCounter')
      .should('not.be.visible')
    // System load
    cy.get('#activitiesSearchButton')
      .should('have.value', 'Check Availability')
  })

  it('Activity Available Card info', () => {
    // The Actvity available is displayed
    cy.get('.c-package-options > .t-position-relative')
      .should('be.visible')
    // The Activity name in the cardis displayed
    cy.get('[class="t-heading-4"]')
      .should('be.visible')
    // The activity Duration & Pick Up is displayed
    cy.get('[class="t-supplementary-text t-p-r-48 t-color-grey-dark t-m-t-8"]')
      .should('be.visible')
    // The activity label is displayed
    cy.get('[class="t-p-b-4 t-label-text-small"]')
      .should('be.visible')
    // The activity strikethrough price is displayed
    cy.get('[class="t-p-l-8"]')
      .should('be.visible')
    // The activity normal price is displayed
    cy.get('[class="t-heading-4 t-middle-text"]')
      .should('be.visible')
    // The activity VIP price is displayed
    cy.get('[class="t-m-t-4 c-product-price-comparison t-display-flex t-items-center t-justify-flex-start t-m-t-4"]')
      .should('be.visible')
  })

  it('Inclusions & Exclusions', () => {
    // The Inclusions & Exclusions is displayed when click the accordion
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(1) > .c-accordion-item > .t-accordion-item-list > .t-accordion-item-header > .t-accordion-title')
      .should('be.visible')
      .click()
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(1) > .c-accordion-item > .t-accordion-item-list')
      .should('have.class', 'active')
  })

  it('Itinerary', () => {
    // The Itinerary is displayed when click the accordion
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(2) > .c-accordion-item > .t-accordion-item-list > .t-accordion-item-header > .t-accordion-title')
      .should('be.visible')
      .click()
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(2) > .c-accordion-item > .t-accordion-item-list')
      .should('have.class', 'active')
  })

  it('Additional Info', () => {
    // The Additional Info is displayed when click the accordion
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(3) > .c-accordion-item > .t-accordion-item-list > .t-accordion-item-header > .t-accordion-title')
      .should('be.visible')
      .click()
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(3) > .c-accordion-item > .t-accordion-item-list')
      .should('have.class', 'active')
  })

  it('Voucher Requirements', () => {
    // The Voucher Requirements is displayed when click the accordion
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(4) > .c-accordion-item > .t-accordion-item-list > .t-accordion-item-header > .t-accordion-title')
      .should('be.visible')
      .click()
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(4) > .c-accordion-item > .t-accordion-item-list')
      .should('have.class', 'active')
  })

  it('Cancellation Policy', () => {
    // The Cancellation Policy is displayed when click the accordion
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(5) > .c-accordion-item > .t-accordion-item-list > .t-accordion-item-header > .t-accordion-title')
      .should('be.visible')
      .click()
    cy.get('.t-p-r-64 > .c-accordion > :nth-child(5) > .c-accordion-item > .t-accordion-item-list')
      .should('have.class', 'active')
  })

  it('Language', () => {
    // The 'Language' is displayed
    cy.get('.t-columns > :nth-child(1) > .t-text-callout')
      .should('contain', 'Language')
      .and('be.visible')
    // The Language info is displayed
    cy.get('.t-mobile-m-t-8 > .t-columns > :nth-child(2) > .t-body-text')
      .should('be.visible')
  })

  it('Age Req.', () => {
    // The 'Age Req.' is displayed
    cy.get(':nth-child(3) > .t-text-callout')
      .should('contain', 'Age Req.')
      .and('be.visible')
    // The Age Req. info is displayed
    cy.get('.t-columns > :nth-child(4) > .t-body-text')
      .should('be.visible')
  })

  it('Fitness Req.', () => {
    // The 'Fitness Req.' is displayed
    cy.get('.t-columns > :nth-child(5) > .t-text-callout')
      .should('contain', 'Fitness Req.')
      .and('be.visible')
    // The Fitness Req. info is displayed
    cy.get('.t-columns > :nth-child(6) > .t-body-text')
      .should('be.visible')
  })

  it('Group Size', () => {
    // The 'Group Size' is displayed
    cy.get(':nth-child(7) > .t-text-callout')
      .should('contain', 'Group Size')
      .and('be.visible')
    // The Group Size info is displayed
    cy.get(':nth-child(8) > .t-body-text')
      .should('be.visible')
  })  

  it('Claim your Listing', () => {
    // The 'Claim your Listing' is displayed
    cy.get('.t-col-10 > div > :nth-child(2) > .t-heading-6')
      .should('be.visible')
      .click()
    // The Claim your Listing is redirect to Login page
    cy.origin('https://accounts.wandr.freya.travlr.com', () => {
      cy.url().should('include', '/login');
    })
  })

  it('Book Activity', () => {
    // The 'Book Now' is displayed
    cy.get(':nth-child(2) > :nth-child(1) > .t-display-table > .t-text-align-right > .t-flex-direction-column-mobile > .t-p-l-16 > .t-btn')
      .should('contain', 'Book Now')
      .click()
    // Redirect to Login page
    cy.origin('https://accounts.wandr.freya.travlr.com', () => {
      cy.url().should('include', '/login')
    })
  })
})