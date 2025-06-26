describe('Accommodation Landing Page', () => {
  beforeEach( () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/accommodation')
  })
  
  it('The hero image is displayed', () => {
    cy.get('[class="t-hero-main-background"]')
      .should('have.attr', 'style', 'background-image: url(&quot;https://s3.ap-southeast-2.amazonaws.com/static.trvcdn.net/uploads/images/venue/69fee68c06143a221cde2d369c628886.jpg&quot;);')
  })

  it('Popular Destinations', () => {
    // The search displayed the placeholder
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .should('have.attr', 'placeholder', 'Where are you going ?')
      .click()
    // Ensure the Popular Destinations is displayed
    cy.get('.ajax-auto-complete-popup')
      .should('have.class', 'active')
      .and('be.visible')
    // Click the options in the Popular Destinations => Queensland, Australia
    cy.get('.ajax-auto-complete-results > ul > :nth-child(1)')
      .click()
    // The Popular Destination is not displayed
    cy.get('.ajax-auto-complete-popup')
      .should('not.have.class', 'active')
    // The destination chosen is displayed in the search bar
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .should('have.value', 'Queensland, Australia')
    // The button is active
    cy.get('[class="t-btn t-btn-primary"]')
      .should('be.enabled')
      .click()
    cy.url().should('include', '/search?Dest=Queensland&DestFullName=Queensland,+Australia&DisplayFullName=Queensland,+Australia')
  })

  it(' "x" button in the Search Bar', () => {
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .click()
    // Click the options in the Popular Destinations => Queensland, Australia
    cy.get('.ajax-auto-complete-results > ul > :nth-child(1)')
      .click()
    // The 'x' button should be visible
    cy.get('.ajax-auto-complete-input-loader')
      .should('be.visible')
    // The search bar is displayed again the placeholder after the x button is click
    // The Popular Destination is displayed
    cy.get('.ajax-auto-complete-input-loader')
      .click()
    cy.get('.ajax-auto-complete-popup')
      .should('have.class', 'active')
      .and('be.visible')
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .should('have.attr', 'placeholder', 'Where are you going ?')
    // The 'x' button is not displayed
    cy.get('.ajax-auto-complete-input-loader')
      .should('not.exist')
  })

  it('Search with Destination', () => {
    // Search 'Australi' in the search bar
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .type('Australi')
    cy.wait(5000)
    // Ensure the options pop up is displayed
    cy.get('.ajax-auto-complete-popup')
      .should('have.class', 'active')
    // The result is displayed
    cy.get('.ajax-auto-complete-results')
      .should('be.visible')
    // Ensure the result pop up displayed 6 result
    cy.get('[class="ajax-auto-complete-result t-body-text t-color-grey-dark t-p-l-16 t-p-t-10 t-p-r-16 t-p-b-10"]')
      .should('have.length', 6)
    // Ensure the destination icon is displayed
    cy.get(':nth-child(1) > .option__item > div > .icon-location')
      .should('be.visible')
    //Choose the Australia
    cy.get('.ajax-auto-complete-results > ul > :nth-child(1)')
      .click()
    // The destination chosen is displayed in the search bar
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .should('have.value', 'Australia')
    // Ensure the option pop up is not displayed after choose the options
    cy.get('.ajax-auto-complete-popup')
      .should('not.have.class', 'active')
    // Click the Search button
    cy.get('[class="t-btn t-btn-primary"]')
      .click()
    cy.url().should('include', '/search?Dest=Australia&DestFullName=Australia&DisplayFullName=Australia')
  })

  it('Search with Property', () => {
    // Search 'hotel aston' in the search bar
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .type('hotel aston')
    cy.wait(5000)
    // Ensure the option pop up is displayed
    cy.get('.ajax-auto-complete-popup')
      .should('have.class', 'active')
    // The result is displayed
    cy.get('.ajax-auto-complete-results')
      .should('be.visible')
    // Ensure the property image in the option result is displayed
    cy.get(':nth-child(4) > .option__item > .t-display-flex > .option__image')
      .should('be.visible')
    //Choose the Hotel Aston
    cy.get(':nth-child(4) > .option__item > .t-display-flex')
      .click()
    // The destination chosen is displayed in the search bar
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .should('have.value', 'Hotel Aston')
    // Ensure the option pop up is not displayed after choose the options
    cy.get('.ajax-auto-complete-popup')
      .should('not.have.class', 'active')
    // Click the Search button
    cy.get('[class="t-btn t-btn-primary"]')
      .click()
    cy.url().should('include', '/search?Dest=Hotel+Aston&DestFullName=Hotel+Aston&DisplayFullName=Hotel+Aston')
  })

  it('Blank validation search', () => {
    // Leave the search bar blank
    // Click the Search button
    cy.get('[class="t-btn t-btn-primary"]')
      .click()
    // Error
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group')
      .should('have.class', 'has-error')
    // The error message is displayed
    cy.get('.tooltip--input-form')
      .should('be.visible')
    cy.get('.tooltip--input-form')
      .should('have.text', '\n              This field is required\n            ')
    // The 'Search' button is disabled
    cy.get('[class="t-btn t-btn-primary"]')
      .should('be.disabled')
    cy.get('.t-input-label')
      .should('have.css', 'color', 'rgb(244, 82, 82)')
  })

  it('Not Found search', () => {
    // Search 'hotel aston' in the search bar
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group > .t-input-icon-group > .t-input-text')
      .type('QWERTYUIOP')
    cy.wait(3000)
    // Display the not found message 
    cy.get('.ajax-auto-complete-results > .t-body-text')
      .should('have.text', '\n                  Your search did not match any result please try again.\n                ')
    // Click the Search button
    cy.get('[class="t-btn t-btn-primary"]')
      .click()
    // Error
    cy.get('.c-accommodation-ajax-auto-complete > .t-input-group')
      .should('have.class', 'has-error')
    // The error message is displayed
    cy.get('.tooltip--input-form')
      .should('be.visible')
    cy.get('.tooltip--input-form')
      .should('have.text', '\n              This field is required\n            ')
    // The 'Search' button is disabled
    cy.get('.t-btn-accommodation > .t-btn')
      .should('be.disabled')
    cy.get('.t-input-label')
      .should('have.css', 'color', 'rgb(244, 82, 82)')
  })

  it('Pick Date', () => {
    cy.get('[class="t-date-range-picker-trigger t-position-relative t-input-text t-text-align-left border-gray-300"]')
      .click()
    // Display the date
    cy.get('.el-picker-panel')
      .should('be.visible')
    // The default date is todays's date as the start date
    cy.get('.today')
      .should('be.visible')
    // The default date is 1 day after today
    cy.get('.end-date')
      .should('be.visible')
    // Choose the date for the start date
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
    cy.get('[class="t-date-range-picker-trigger t-position-relative t-input-text t-text-align-left border-gray-300"]')
      .click()
    cy.get('.start-date')
      .should('exist')
    cy.get('.end-date')
      .should('exist')
  })

  it('Add guest number', () => {
    // Click to display the guest data form
    cy.get('.guest-count-btn') 
      .click() 
    // The guest number form is displayed
    cy.get('.dropdown')
      .should('have.class', 'dropdown--opened')
    // The default adult number is 2
    cy.get('[class="counter__field"]')
      .first()
      .should('have.value', '2')
    // The default child number is 0
    cy.get('[class="counter__field"]')
      .eq(1)
      .should('have.value', '0')
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
    cy.get('.select-ages')
      .should('be.visible')
    cy.get('#select-ages-1')
      .select('2') // choose the age '2' for the child
    // The age options should have age from 0 to 17
    cy.get('#select-ages-1')
      .find('option')
      .should('have.length', 18)
    // The 'Apply' button is working
    cy.get('.dropdown__entry > .t-btn')
      .should('be.enabled')
      .click()
    // The guest form is closed
    cy.get('.dropdown')
      .should('not.have.class', 'dropdown--opened')
  })

  it('Add guest number with + button', () => {
    // Click to display the guest data form
    cy.get('.guest-count-btn') 
      .click() 
    // Click the + button to add the adult guest number
    Cypress._.times(3, () => {
      cy.get('[data-gtm-event="ev_counter-number-plus_button"]')
        .first()
        .click();
    })
    // The adult value is 5
    cy.get('[class="counter__field"]')
      .first()
      .should('have.value', '5')
    // Click the + button to add the child guest number
    Cypress._.times(3, () => {
      cy.get('[data-gtm-event="ev_counter-number-plus_button"]')
      .eq(1)
      .click();
      cy.get('[data-gtm-event="ev_counter-number-plus_button"]').invoke('val').then((val) => {
        const childNum = Number(val); // the child value
        // The number of dropdown displayed is relevant with the number of child
        cy.get('[id="select-ages-"]')
          .should('have.length', childNum);
      })
    })
    // The child should have value 3
    cy.get('[class="counter__field"]')
      .eq(1)
      .should('have.value', '3')
    // Click the 'Apply' button
    cy.get('.dropdown__entry > .t-btn')
      .click()
    // The guest form is closed
    cy.get('.dropdown')
      .should('not.have.class', 'dropdown--opened')
  })

  it('Add guest number with - button', () => {
    // Click to display the guest data form
    cy.get('.guest-count-btn') 
      .click() 
    // Click the + button to add the adult guest number
    Cypress._.times(3, () => {
      cy.get('[data-gtm-event="ev_counter-number-plus_button"]')
        .first()
        .click();
    })
    // Click the + button to add the child guest number
    Cypress._.times(3, () => {
      cy.get('[data-gtm-event="ev_counter-number-plus_button"]')
        .eq(1)
        .click();
    })
    // The - button is active when the guest value is > 1
    cy.get('[data-gtm-event="ev_counter-number-min_button"]')
      .should('be.visible')
    // Click the - button to reduce the adult guest number
    Cypress._.times(3, () => {
      cy.get('[data-gtm-event="ev_counter-number-min_button"]')
        .first()
        .click();
    })
    // Ensure the adult value is 2
    cy.get('[class="counter__field"]')
      .first()
      .should('have.value', '2')
    // Click the - button to reduce the child guest number
    Cypress._.times(2, () => {
      cy.get('[data-gtm-event="ev_counter-number-min_button"]')
      .eq(1)
      .click();
    })
    // Ensure the child value is 1
    cy.get('[class="counter__field"]')
      .eq(1)
      .should('have.value', '1')
    // Click the 'Apply' button
    cy.get('.dropdown__entry > .t-btn')
      .click()
    // The guest form is closed
    cy.get('.dropdown')
      .should('not.have.class', 'dropdown--opened')
  })

  it('Add & Remove Room', () => {
    // Click to display the guest data form
    cy.get('.guest-count-btn') 
      .click() 
    // The 'Add Room' button is displayed
    cy.get('[data-gtm-event="ev_accommodation_search_byguestsandrooms_addroom_button"]')
      .should('be.visible')
      .click()
    // The form for Room 2 is displayed
    cy.get('.guest-count-box')
      .should('exist') 
      .and('be.visible')
    // Add the room again
    cy.get('[data-gtm-event="ev_accommodation_search_byguestsandrooms_addroom_button"]')
      .click()
    // The form for Room 3 is displayed
    cy.get('.guest-count-box')
      .should('have.length', 3) 
      .and('be.visible')
    // Remove Room
    // The button 'Remove' is displayed
    cy.get('[data-gtm-event="ev_accommodation_search_byguestsandrooms_removeroom_button"]')
      .should('be.visible')
    cy.get('[data-gtm-event="ev_accommodation_search_byguestsandrooms_removeroom_button"]')
      .first()
      .click()
    // The form for Room 3 is not exist
    cy.get('.guest-count-box')
      .should('have.length', 2)
    // Click the 'Apply' button
    cy.get('.dropdown__entry > .t-btn')
      .click()
    // The guest form is closed
    cy.get('.dropdown')
      .should('not.have.class', 'dropdown--opened') 
  })

  it('Accommodation Deals of the Day', () => {
    cy.get('[class="c-section t-m-t-40 c-section--single"]')
      .should('be.visible')
    cy.get(':nth-child(3) > .c-section > .section-title > .t-container > .t-display-table > .t-display-table-cell > .t-heading-3')
      .should('have.text', '\n            Deals of The Day\n          ')
    // The Deals of the Day cards are displayed
    cy.get('.t-row')
      .should('be.visible')
    // The Deals name is displayed
    cy.get('[class="card-deal__title t-heading-4 t-ellipsis-2-line t-mobile-m-b-4 t-m-b-8"]')
      .should('be.visible')
    // The Deals tag is displayed
    cy.get('[class="card-deal__place t-display-block t-v-align-bottom t-w-100 t-ellipsis"]')
      .should('be.visible')
    // The Deals label is displayed
    cy.get('[class="card-deal__label t-ellipsis t-display-flex t-items-center t-border-radius t-mobile-m-b-8 t-m-b-12 t-p-t-6 t-p-b-6 t-p-l-12 t-p-r-12 t-body-text"]')
      .should('be.visible')
    // The Deals location is displayed
    cy.get('[class="card-deal__location t-display-flex t-items-center t-w-100 t-ellipsis t-p-t-8 t-m-t-0 t-color-grey-darkest"]')
      .should('be.visible')
    // The Deals price is displayed
    cy.get('[class="t-heading-3 t-display-flex t-items-center t-m-b-0"]')
      .should('be.visible')
  })

  it('Popular Deals', () => {
    // The Popular Deals Title is displayed
    cy.get('[class="t-display-table-cell t-v-align-middle t-w-50"]')
      .should('be.visible')
    cy.get(':nth-child(4) > .c-section > .section-title > .t-container > .t-display-table > .t-display-table-cell > .t-heading-3')
      .should('have.text', '\n            Popular Deals\n          ')
    // The Deals of the Day cards are displayed
    cy.get('[class="card-deal t-card-content t-display-flex t-display-block-mobile card-deal--standard"]')
      .should('be.visible')
  })

  // Popular Destination
  it('Popular Destination', () => {
    cy.get(':nth-child(5) > .t-container > .t-w-100 > .t-m-b-16 > .mw-60-md > .t-heading-3')
      .should('have.text', '\n                Popular Destinations\n              ')
    // The destination is displayed
    cy.get('[class="t-col-md-4"]')
      .should('be.visible')
    // The title of the destination is displayed
    cy.get('[class="t-card-title-content t-text-align-center"]')
      .should('be.visible')
    // The card has image
    cy.get('.t-card-background')
      .should('have.css', 'background-image')
    // The card redirect to the correct link
    cy.get('[class="t-col-md-4"]') // Click Perth
      .first()  
      .click()
    cy.url().should('include', '/search?Dest=Greater+Perth+&amp;DestFullName=Greater+Perth+,+Western+Australia,+Australia')
  })

  it('Featured Accommodation', () => {
    cy.get(':nth-child(6) > .t-container > .t-m-b-16.t-w-100 > .t-m-b-16 > .mw-60-md > .t-heading-3')
      .should('have.text', '\n                Featured Accommodation\n              ')
    // Ensure the cards are displayed
    cy.get('[class="t-col-md-4 t-col-lg-3"]')
      .should('be.visible')
  })
})