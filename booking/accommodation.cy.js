describe('Accommodation Booking', () => {
  it('Book from OTA Search', () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com')
    // The OTA Hotel tab is active
    cy.get('#headlessui-tabs-tab-v-0-0-0')
      .should('have.attr', 'aria-selected', 'true')
    // The search field for OTA Hotel is displayed
    cy.get('#headlessui-tabs-panel-v-0-0-5')
      .should('be.visible')
    // The search displayed the placeholder
    cy.get('#el-id-1024-0')
      .should('have.attr', 'placeholder', 'Where are you going?')
      .click()
    // Search 'Australi' in the search bar
    cy.get('#el-id-1024-0')
      .type('Australi')
    cy.wait(5000)
    // The search suggestion is displayed
    cy.get('#headlessui-popover-panel-v-0-0-1-0-5')
      .should('be.visible')
    //Choose the Australia
    cy.get('#headlessui-popover-panel-v-0-0-1-0-5 > :nth-child(1)')
      .click()
    // Pick Date
    cy.get('.ota-search-accommodation > :nth-child(2) > .w-full > .absolute')
      .click()
    // The date field is displayed
    cy.get('#el-id-1024-7')
      .should('be.visible')
    // Choose the date for the start date
    cy.get('#el-id-1024-7 > .el-picker-panel > .el-picker-panel__body-wrapper > .el-picker-panel__body > .is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(6) > .el-date-table-cell')
      .click()
    // Choose the date for the end date
    cy.get('#el-id-1024-7 > .el-picker-panel > .el-picker-panel__body-wrapper > .el-picker-panel__body > .is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(7) > .el-date-table-cell')
      .click()
    // Add the Guest Number
    // Click to display the guest data form
    cy.get('.cursor-pointer > .rounded-lg')
      .click() 
    // Enter 3 adult and 1 child
    // Add adult
    cy.get('[class="vue-number-input__input"]')
      .first()
      .clear()
      .type('3')
    // Add child number
    cy.get('[class="vue-number-input__input"]')
      .eq(1)
      .clear()
      .type('1')
    // The 'Apply' button is working
    cy.get('.overflow-auto > .t-btn-primary')
      .should('be.enabled')
      .click()
    // Click the Search button
    cy.get('[data-gtm-event="ev_homepage_federatedsearch_accommodation_clicksearchbutton"]')
      .should('be.enabled')
      .click()
    cy.wait(5000)
    cy.url().should('include', '/search')
    // Search Page
    // The button 'Book Now' has link of the Detail page
    cy.get('[class="a-btn-primary rounded-[100px] text-xs h-9 leading-9 mt-1.5 hidden md:block"]')
      .eq(0)
      .should('have.attr', 'href', '/accommodation/detail/sydney-harbour-marriott-hotel-at-circular-quay?HotelCode=0118811&CheckIn=2025-07-04&CheckOut=2025-07-05&CurrencyCode=AUD&Provider=Expedia&GuestCounts[0][0][AgeQualifyingCode]=10&GuestCounts[0][0][Count]=3&GuestCounts[0][0][Age]=25&GuestCounts[0][1][AgeQualifyingCode]=8&GuestCounts[0][1][Count]=1&GuestCounts[0][1][Age]=7')
  })

  it('Book from Landing Page', () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/accommodation')
    // Search 'Australi' in the search bar
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .type('Australi')
    cy.wait(5000)
    //Choose the Australia
    cy.get('.ajax-auto-complete-results > ul > :nth-child(1)')
      .click()
    // Pick Date
    cy.get('[class="t-date-range-picker-trigger t-position-relative t-input-text t-text-align-left border-gray-300"]')
      .click()
    // Choose the date for the start date
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(6)')
      .click()
    // Choose the date for the end date
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(7)')
      .click()
    // Add the Guest Number
    // Click to display the guest data form
    cy.get('.guest-count-btn') 
      .click() 
    // Enter 3 adult and 1 child
    // Add adult
    cy.get('[class="counter__field"]')
      .first()
      .clear()
      .type('3')
    // Add child number
    cy.get('[class="counter__field"]')
      .eq(1)
      .clear()
      .type('1')
    // The child age number is displayed
    cy.get('#select-ages-1')
      .select('2') // choose the age '2' for the child
    // The 'Apply' button is working
    cy.get('.dropdown__entry > .t-btn')
      .should('be.enabled')
      .click()
    // Click the Search button
    cy.get('[class="t-btn t-btn-primary"]')
      .click()
    cy.wait(5000)
    cy.url().should('include', '/search')
    // Search Page
    // The button 'Book Now' has link of the Detail page
    cy.get('[class="a-btn-primary rounded-[100px] text-xs h-9 leading-9 mt-1.5 hidden md:block"]')
      .eq(0)
      .should('have.attr', 'href', '/accommodation/detail/vibe-hotel-gold-coast?HotelCode=025115&CheckIn=2025-07-04&CheckOut=2025-07-05&CurrencyCode=AUD&Provider=Agoda&contentItemId=28216&GuestCounts[0][0][AgeQualifyingCode]=10&GuestCounts[0][0][Count]=3&GuestCounts[0][0][Age]=25&GuestCounts[0][1][AgeQualifyingCode]=7&GuestCounts[0][1][Count]=1&GuestCounts[0][1][Age]=1')
  })
})