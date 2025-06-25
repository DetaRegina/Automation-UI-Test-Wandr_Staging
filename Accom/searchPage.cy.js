describe('Accommodation Search Page', () => {
  beforeEach( () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/accommodation/search')
  })

  it('Popular Destinations', () => {
    // The search displayed the placeholder
    cy.get('.el-input__inner')
      .should('have.attr', 'placeholder', 'Where are you going?')
    cy.get('#el-id-1024-0')
      .click()
    // Ensure the Popular Destinations is displayed
    cy.get('#headlessui-popover-panel-v-0-0-1')
      .should('be.visible')
    // Click the options in the Popular Destinations => Queensland, Australia
    cy.get('#headlessui-popover-panel-v-0-0-1 > :nth-child(2)')
      .click()
    // The Popular Destination is not displayed
    cy.get('#headlessui-popover-panel-v-0-0-1')
      .should('not.exist')
    // The destination chosen is displayed in the search bar
    cy.get('.el-input__inner')
      .should('have.value', 'Queensland, Australia')
    // The button is active
    cy.get('.a-btn-primary')
      .should('be.enabled')
      .click()
    cy.url().should('include', '?Dest=Queensland&DestFullName=Queensland,+Australia&DisplayFullName=Queensland,+Australia')
  })

  it('Search with Destination', () => {
    // Search 'Australi' in the search bar
    cy.get('#el-id-1024-0')
      .type('Australi')
    // Ensure the options pop up is displayed
    cy.get('#headlessui-popover-panel-v-0-0-5')
      .should('be.visible')
    // Ensure the destination icon is displayed
    cy.get(':nth-child(1) > .icon-location')
      .should('be.visible')
    //Choose the Australia
    cy.get('#headlessui-popover-panel-v-0-0-5 > :nth-child(1)')
      .click()
    // The destination chosen is displayed in the search bar
    cy.get('#el-id-1024-0')
      .should('have.value', 'Australia')
    // Ensure the option pop up is not displayed after choose the options
    cy.get('#headlessui-popover-panel-v-0-0-5')
      .should('not.have.class', 'active')
    // Click the Search button
    cy.get('.a-btn-primary')
      .click()
    cy.url().should('include', '?Dest=Australia&DestFullName=Australia&DisplayFullName=Australia')
  })

  it('Search with Property', () => {
    // Search 'hotel aston' in the search bar
    cy.get('#el-id-1024-0')
      .type('hotel aston')
    // Ensure the option pop up is displayed
    cy.get('#headlessui-popover-panel-v-0-0-5')
      .should('be.visible')
    //Choose the Hotel Aston
    cy.get('#headlessui-popover-panel-v-0-0-5 > :nth-child(4)')
      .click()
    // The destination chosen is displayed in the search bar
    cy.get('#el-id-1024-0')
      .should('have.value', 'Hotel Aston')
    // Ensure the option pop up is not displayed after choose the options
    cy.get('#headlessui-popover-panel-v-0-0-5')
      .should('not.have.class', 'active')
    // Click the Search button
    cy.get('.a-btn-primary')
      .click()
    cy.url().should('include', '?Dest=Hotel+Aston&DestFullName=Hotel+Aston')
  })

  it('Search with Keyword', () => {
    // Search 'bali ubud' in the search bar
    cy.get('#el-id-1024-0')
      .type('bali ubud')
    // Click the 'Search' button 
    cy.get('.a-btn-primary')
      .click()
    // Display the eror message
    cy.get('[class="el-input el-input--large el-input--suffix input-error"]')
      .should('exist')
    cy.get('.input-error')
      .should('have.css', '--tw-content', "This field is required")
  })

  it('Pick Date', () => {
    cy.get('.custom-display-date-range > .absolute')
      .click()
    // Display the date
    cy.get('.el-picker-panel')
      .should('be.visible')
    // The default date is todays's date as the start date
    cy.get('.start-date')
      .should('be.visible')
    // The default date is 1 day after today
    cy.get('.end-date')
      .should('be.visible')
    // Choose the date for the start date
    Cypress._.times(3, () => {
      cy.get('.arrow-left')
      .click()
    })
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(6)')
      .click()
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(6)')
      .should('have.class', 'in-range start-date end-date')
    // Choose the date for the end date
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(7)')
      .click()
    // The date is hidden after choose the end date
    cy.get('.el-picker-panel')
      .should('not.be.visible')
    // Check the property
    cy.get('.custom-display-date-range > .absolute')
      .click()
    cy.get('.start-date')
      .should('exist')
    cy.get('.end-date')
      .should('exist')
  })

  it('Add guest number', () => {
    // Click to display the guest data form
    cy.wait(3000)
    cy.get('.cursor-pointer > .rounded-lg')
      .click() 
    // The guest number form is displayed
    cy.get('.overflow-auto')
      .should('be.visible')
    // The default adult number is 2
    cy.get('[class="vue-number-input__input"]')
      .first()
      .should('have.value', '2')
    // The default child number is 0
    cy.get('[class="vue-number-input__input"]')
      .eq(1)
      .should('have.value', '0')
    // The default infant number is 0
    cy.get('[class="vue-number-input__input"]')
      .eq(2)
      .should('have.value', '0')
    // Enter 3 adult, 1 child, 1 infant
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
    // Add infant number
    cy.get('[class="vue-number-input__input"]')
      .eq(2)
      .clear()
      .type('1')
    // The 'Apply' button is working
    cy.get('.t-btn-primary')
      .should('be.enabled')
      .click()
    // The guest form is closed
    cy.get('.overflow-auto')
      .should('not.exist')
  })

  it('Add guest number with + button', () => {
    // Click to display the guest data form
    cy.wait(3000)
    cy.get('.cursor-pointer > .rounded-lg')
      .click() 
    // Click the + button to add the adult guest number
    Cypress._.times(3, () => {
      cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
        .first()
        .click();
    })
    // The adult value is 5
    cy.get('[class="vue-number-input__input"]')
      .first()
      .should('have.value', '5')
    // Click the + button to add the child guest number
    Cypress._.times(2, () => {
      cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
      .eq(1)
      .click();
    })
    // The child should have value 2
    cy.get('[class="vue-number-input__input"]')
      .eq(1)
      .should('have.value', '2')
    // Click the + button to add the infant guest number
    cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
      .eq(2)
      .click();
    // The infant should have value 1
    cy.get('[class="vue-number-input__input"]')
      .eq(2)
      .should('have.value', '1')
    // Click the 'Apply' button
    cy.get('.t-btn-primary')
      .click()
    // The guest form is closed
    cy.get('.overflow-auto')
      .should('not.exist')
  })

  it('Add guest number with - button', () => {
    // Click to display the guest data form
    cy.wait(3000)
    cy.get('.cursor-pointer > .rounded-lg')
      .click() 
    // Click the + button to add the adult guest number
    Cypress._.times(3, () => {
      cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
        .first()
        .click()
    })
    // Click the + button to add the child guest number
    cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
      .eq(1)
      .click()
    // Click the + button to add the infant guest number
    cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
      .eq(2)
      .click()
    // The - button is active when the guest value is > 1
    cy.get('[class="vue-number-input__button vue-number-input__button--minus"]')
      .should('be.visible')
    // Click the - button to reduce the adult guest number
    Cypress._.times(3, () => {
      cy.get('[class="vue-number-input__button vue-number-input__button--minus"]')
        .first()
        .click()
    })
    // Ensure the adult value is 2
    cy.get('[class="vue-number-input__input"]')
      .first()
      .should('have.value', '2')
    // Click the - button to reduce the child guest number
    cy.get('[class="vue-number-input__button vue-number-input__button--minus"]')
      .eq(1)
      .click()
    // Ensure the child value is 0
    cy.get('[class="vue-number-input__input"]')
      .eq(1)
      .should('have.value', '0')
    // Click the - button to reduce the infant guest number
    cy.get('[class="vue-number-input__button vue-number-input__button--minus"]')
      .eq(2)
      .click()
    // Ensure the infant value is 0
    cy.get('[class="vue-number-input__input"]')
      .eq(2)
      .should('have.value', '0')
    // Click the 'Apply' button
    cy.get('.t-btn-primary')
      .click()
    // The guest form is closed
    cy.get('.overflow-auto')
      .should('not.exist')
  })

  it('Add & reduce room', () => {
    // Click to display the guest data form
    cy.wait(3000)
    cy.get('.cursor-pointer > .rounded-lg')
      .click()
    // The default room number is 1
    cy.get('[class="vue-number-input__input"]')
      .eq(3)
      .should('have.value', '1')
    // Add the Room Number
    // Click the + button to add the room number
    Cypress._.times(3, () => {
      cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
        .eq(3)
        .click();
    })
    // The room value is 4
    cy.get('[class="vue-number-input__input"]')
      .eq(3)
      .should('have.value', '4')
    // Reduce the Room Number
    // Click the - button to add the room number
    Cypress._.times(3, () => {
      cy.get('[class="vue-number-input__button vue-number-input__button--minus"]')
        .eq(3)
        .click();
    })
    // The room value is 1
    cy.get('[class="vue-number-input__input"]')
      .eq(3)
      .should('have.value', '1')    
    // Click the 'Apply' button
    cy.get('.t-btn-primary')
      .click()
    // The guest form is closed
    cy.get('.overflow-auto')
      .should('not.exist')
  })

  it('Search with Destination, Date, and Guest', () => {
    // Search 'Australi' in the search bar
    cy.wait(3000)
    cy.get('#el-id-1024-0')
      .type('Australi')
    cy.wait(3000)
    //Choose the Australia
    cy.get('#headlessui-popover-panel-v-0-0-5 > :nth-child(1)')
      .click()
    // Click the Date
    cy.get('.custom-display-date-range > .absolute')
      .click()
    // Choose the date for the start date
    Cypress._.times(4, () => {
      cy.get('.arrow-left')
      .click()
    })
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(6)')
      .click()
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(6)')
      .should('have.class', 'in-range start-date end-date')
    // Choose the date for the end date
    cy.get('.is-right > .el-date-table > tbody > :nth-child(2) > :nth-child(7)')
      .click()
    // Click to display the guest data form
    cy.get('.cursor-pointer > .rounded-lg')
      .click()
    // Enter 3 adult, 1 child, 1 infant
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
    // Add infant number
    cy.get('[class="vue-number-input__input"]')
      .eq(2)
      .clear()
      .type('1')
    // Add the Room Number
    // Click the + button to add the room number
    cy.get('[class="vue-number-input__button vue-number-input__button--plus"]')
      .eq(3)
      .click();
    // Click the 'Apply' button
    cy.get('.t-btn-primary')
      .click()
    // Click 'Search' button
    cy.get('.a-btn-primary')
      .click()
    cy.url().should('include', '?Dest=Australia&DestFullName=Australia&DisplayFullName=Australia&Days=1&CheckIn=2025-08-01&CheckOut=2025-08-02&PropertyId=-1&PropertyName=Australia&GuestCounts[0][0][AgeQualifyingCode]=10&GuestCounts[0][0][Count]=3&GuestCounts[0][1][AgeQualifyingCode]=8&GuestCounts[0][1][Count]=1&GuestCounts[0][1][Age]=3&GuestCounts[1][0][AgeQualifyingCode]=10&GuestCounts[1][0][Count]=3&infantCount=1')
  })

  it('Sort', () => {
    // Search 'Australi' in the search bar
    cy.wait(3000)
    cy.get('#el-id-1024-0')
      .type('Australi')
    cy.wait(3000)
    //Choose the Australia
    cy.get('#headlessui-popover-panel-v-0-0-5 > :nth-child(1)')
      .click()
    // Click 'Search' button
    cy.get('.a-btn-primary')
      .click()
    cy.wait(10000) // wait for the result
    // Click the Sort
    cy.get('.select-trigger > .el-input > .el-input__wrapper')
      .should('be.visible')
      .click()
    // Ensure the Sort dropdown is displayed
    cy.get('.el-input__wrapper')
      .should('have.class', 'is-focus')
    cy.get('.el-scrollbar__view')
      .should('be.visible')
    // The default sort is Recommended
    cy.get('.el-scrollbar__view > :nth-child(1)')
      .should('have.class', 'selected')
    // Choose the Popularity Sort
    cy.get('.el-scrollbar__view > :nth-child(2)')
      .click()
    cy.wait(5000) // wait for the result
    cy.get('.el-scrollbar__view > :nth-child(2)')
      .should('have.class', 'selected')
    // Click again the Sort
    cy.get('.select-trigger > .el-input > .el-input__wrapper')
      .click()
    // Choose the Guest Review Sort
    cy.get('.el-scrollbar__view > :nth-child(3)')
      .click()
    cy.wait(5000) // wait for the result
    cy.get('.el-scrollbar__view > :nth-child(3)')
      .should('have.class', 'selected')
  })

  it('Book the Hotel', () => {
    // Search 'Australi' in the search bar
    cy.wait(3000)
    cy.get('#el-id-1024-0')
      .type('Australi')
    cy.wait(3000)
    //Choose the Australia
    cy.get('#headlessui-popover-panel-v-0-0-5 > :nth-child(1)')
      .click()
    // Ensure the option pop up is not displayed after choose the options
    cy.get('#headlessui-popover-panel-v-0-0-5')
      .should('not.have.class', 'active')
    // Click the Search button
    cy.get('.a-btn-primary')
      .click()
    cy.wait(3000)
    // The button 'Book Now' has link of the Detail page
    cy.get('[class="a-btn-primary rounded-[100px] text-xs h-9 leading-9 mt-1.5 hidden md:block"]')
      .eq(0)
      .should('have.attr', 'href', '/accommodation/detail/vibe-hotel-gold-coast?HotelCode=0384978&CheckIn=2025-11-25&CheckOut=2025-11-26&CurrencyCode=AUD&Provider=HotelBeds&contentItemId=28216&GuestCounts[0][0][AgeQualifyingCode]=10&GuestCounts[0][0][Count]=2&GuestCounts[0][0][Age]=25')
  })
})