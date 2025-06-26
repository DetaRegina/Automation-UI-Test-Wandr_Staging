describe('Accommodation Detail Page', () => {
  beforeEach( () => {
    cy.viewport(1280, 720)
    cy.visit('https://wandr.freya.travlr.com/accommodation/detail/vibe-hotel-gold-coast?HotelCode=0128216&CheckIn=2025-08-01&CheckOut=2025-08-02&CurrencyCode=AUD&Provider=Expedia&GuestCounts[0][0][AgeQualifyingCode]=10&GuestCounts[0][0][Count]=2&GuestCounts[0][0][Age]=25&GuestCounts[0][1][AgeQualifyingCode]=7&GuestCounts[0][1][Count]=1&GuestCounts[0][1][Age]=1&GuestCounts[1][0][AgeQualifyingCode]=10&GuestCounts[1][0][Count]=1&GuestCounts[1][0][Age]=25&GuestCounts[1][1][AgeQualifyingCode]=8&GuestCounts[1][1][Count]=1&GuestCounts[1][1][Age]=7')
    cy.wait(6000) // Wait for content to be load
  })
  
  it('Hotel Image', () => {
    cy.get('.accom-detail-gallery-init')
      .should('be.visible')
    // 'See all photo' is displayed
    cy.get('.accom-detail-gallery-cta')
      .should('be.visible')
      .click()
    // The All image page is displayed
    cy.get('#headlessui-dialog-panel-v-0-0-1-1-0-3')
      .should('be.visible')
    cy.wait(15000) // Wait for the photo to be load
    // Default tab is 'All Photo'
    cy.get('#headlessui-tabs-tab-v-0-0-1-1-0-5') 
      .should('have.attr', 'aria-selected', 'true')
    // Click the 'Primary Image' tab
    cy.get('#headlessui-tabs-tab-v-0-0-1-1-0-6 > .py-4')
      .click()
    // The Primary Image is active
    cy.get('#headlessui-tabs-tab-v-0-0-1-1-0-6') 
      .should('have.attr', 'aria-selected', 'true')
    // The 'All Photo' menu is inactive
     cy.get('#headlessui-tabs-tab-v-0-0-1-1-0-5') 
      .should('have.attr', 'aria-selected', 'false')
    // Arrow back is working
    cy.get('[class="h-6 w-6 mr-2 cursor-pointer"]')
      .click()
    // The Image page is closed
    cy.get('#headlessui-dialog-panel-v-0-0-1-1-0-3')
      .should('not.exist')
  })

  it('Accommodation Menu Tab', () => {
    cy.get('.t-container > .justify-between')
      .should('be.visible')
    // The default tabe menu is 'Overview'
    cy.get('[data-href="#accom-detail-overview"]')
      .should('have.class', 'nav-item-active')
    // Ensure the tab Room is working
    cy.get('[data-href="#accom-detail-rooms"]')
      .click()
    cy.wait(2000)
    cy.get('#accom-detail-rooms')
      .scrollIntoView()
      .should('be.visible')
    cy.get('[data-href="#accom-detail-rooms"]')
      .should('have.class', 'nav-item-active')
    // Ensure the tab Location is working
    cy.get('[data-href="#accom-detail-location"]')
      .click()
    cy.wait(2000)
    cy.get('#accom-detail-location')
      .scrollIntoView()
      .should('be.visible')
    cy.get('[data-href="#accom-detail-location"]')
      .should('have.class', 'nav-item-active')
    // Ensure the tab Amenities is working
    cy.get('[data-href="#accom-detail-amenities"]')
      .click()
    cy.wait(2000)
    cy.get('#accom-detail-amenities')
      .scrollIntoView()
      .should('be.visible')
    cy.get('[data-href="#accom-detail-amenities"]')
      .should('have.class', 'nav-item-active')
    // Ensure the tab Policies is working
    cy.get('[data-href="#accom-detail-policies"]')
      .click()
    cy.wait(2000)
    cy.get('#accom-detail-policies')
      .scrollIntoView()
      .should('be.visible')
    cy.get('[data-href="#accom-detail-policies"]')
      .should('have.class', 'nav-item-active')
    // Ensure the tab Reviews is working
    cy.get('[data-href="#accom-detail-reviews"]')
      .click()
    cy.wait(2000)
    cy.get('#accom-detail-reviews')
      .scrollIntoView()
      .should('be.visible')
    cy.get('[data-href="#accom-detail-reviews"]')
      .should('have.class', 'nav-item-active')
  })

  it('Overview content', () => {
    // The accommodation name is displayed
    cy.get('[class="t-heading-2 text-slate-900 text-[28px] leading-9 font-bold mb-3"]')
      .should('be.visible')
    // The rating is displayed
    cy.get('[class="flex mb-2 mb-4"]')
      .should('be.visible')
    // The description is displayed
    cy.get('[class="text-base text-slate-700 text-justify"]')
      .should('be.visible')
    // The number of nights is displayed
    cy.get('[class="text-sm text-slate-700 mb-1"]')
      .should('be.visible')
    // The price is displayed
    cy.get('[class="text-xl t-heading-5 text-slate-900 font-bold mr-2"]')
      .should('be.visible')
    // The popular amenities is displayed
    cy.get('[class="accom-detail-popular-amenities border-b pb-6"]')
      .should('be.visible')
    // The review in the Overview is display
    cy.get('[class="flex flex-col gap-4 my-6"]')
      .should('be.visible')
  })

  it('Amenities in the Overview section', () => {
    // The 'See all amenities' button is displayed
    cy.get('.accom-detail-popular-amenities > .items-center')
      .should('have.text', ' See all amenities ')
      .click()
    cy.get('#accom-detail-amenities')
      .scrollIntoView()
      .should('be.visible')
  })

  it('Reviews in the Overview section', () => {
    // The button 'See all 100 reviews' is working
    cy.get('.gap-4 > .text-blue-500')
      .should('have.text', ' See all 100 reviews ')
      .click()
    cy.get('#accom-detail-reviews')
      .scrollIntoView()
      .should('be.visible')
  })

  it('Location in the Overview section', () => {
    // The button 'See Location' is working
    cy.get('[class="flex items-center text-blue-500 text-primaryMain cursor-pointer"]')
      .contains(' See Location ')
      .click()
    cy.get('#accom-detail-location')
      .scrollIntoView()
      .should('be.visible')
  })

  it('Map in the Overview section', () => {
    cy.wait(5000)
    cy.get('[class="hidden lg:flex items-center text-blue-500 text-primaryMain cursor-pointer"]')
      .contains('View map')
      .click()
    cy.wait(3000)
    // The Map is displayed
    cy.get('.accom-detail-map-fullscreen')
      .should('be.visible')
  })

  it('Book Now button', () => {
    cy.get('.accom-detail-overview-price > .t-btn-primary')
      .should('be.enabled')
      .click()
    cy.get('#accom-detail-rooms')
      .scrollIntoView()
      .should('be.visible')
  })

  it('The Room options are displayed', () => {
    cy.get('.accom-detail-overview-price > .t-btn-primary')
      .should('be.enabled')
      .click()
    cy.get('[class="rounded-lg border shadow-[0_1px_2px_0_rgba(0,0,0,.1)] mb-6 bg-white lg:flex lg:justify-between"]')
      .should('be.visible')
  })

  it('Check & uncheck the Filter Options', () => {
    cy.get('.accom-detail-room-filter')
      .should('be.visible')
    // Click the 'Breakfast Included' filter
    cy.get('.el-checkbox-button__inner')
      .contains('Breakfast included')
      .click()
    cy.contains('.el-checkbox-button__inner', 'Breakfast included')
      .parent()
      .should('have.class', 'is-checked')
    // Click the 'Free Wifi' filter
    cy.get('.el-checkbox-button__inner')
      .contains('Free Wifi')
      .click()
    cy.contains('.el-checkbox-button__inner', 'Free Wifi')
      .parent()
      .should('have.class', 'is-checked')
    // Click again the 'Breakfast Included' filter to inactive the filter
    cy.get('.el-checkbox-button__inner')
      .contains('Breakfast included')
      .click()
    cy.contains('.el-checkbox-button__inner', 'Breakfast included')
      .parent()
      .should('not.have.class', 'is-checked')
  })

  it('Clear Filter Options', () => {
    cy.get('.accom-detail-room-filter')
      .should('be.visible')
    // Click the 'Breakfast Included' filter
    cy.get('.el-checkbox-button__inner')
      .contains('Breakfast included')
      .click()
    // Ensure the Clear Filter is displayed
    cy.get('.inline-flex')
      .should('be.visible')
      .click()
    cy.contains('.el-checkbox-button__inner', 'Breakfast included')
      .parent()
      .should('not.have.class', 'is-checked')
    cy.get('.inline-flex')
      .should('not.exist')
  })

  it('Hotel Card Price Info', () => {
    // Click the Rooms button
    cy.get('[data-href="#accom-detail-rooms"]')
      .click()
    cy.wait(5000)
    // Ensure the strikethrough price is displayed
    cy.get('[class="text-sm text-slate-500 line-through mr-1"]')
      .should('be.visible')
    // Ensure the normal price is displayed
    cy.get('[class="font-bold text-xl t-heading-5 text-slate-900"]')
      .should('be.visible')
    // Ensure the VIP price is displayed
    cy.get('[class="c-product-price-comparison flex items-center justify-flex-start mb-1"]')
      .should('be.visible')
  })

  it('Map in the Location section', () => {
    cy.wait(5000)
    cy.get('[data-href="#accom-detail-location"]')
      .click()
    cy.wait(2000)
    cy.get('[class="flex items-center text-blue-500 text-primaryMain cursor-pointer"]')
      .contains('View map')
      .click()
    // The Map is displayed
    cy.get('.accom-detail-map-fullscreen')
      .should('be.visible')
  })

  it('Update Hotel Booking Date', () =>{
    cy.wait(3000)
    // Click the 'Rooms' tab menu
    cy.get('[data-href="#accom-detail-rooms"]')
      .click()
    // Click the Date
    cy.get('.border-b > .flex.relative > .w-full > .absolute')
      .click()
    // Ensure the date is displayed
    cy.get('[class="el-picker-panel el-date-range-picker"]')
      .should('be.visible')
    // Pick the date
    cy.get('.is-right > .el-date-table > tbody > :nth-child(3) > :nth-child(6) > .el-date-table-cell')
      .click()
    cy.get('.is-right > .el-date-table > tbody > :nth-child(3) > :nth-child(6)')
      .should('have.class', 'in-range start-date end-date')
    // Choose the date for the end date
    cy.get('.is-right > .el-date-table > tbody > :nth-child(3) > :nth-child(7)')
      .click()
    // The date is hidden after choose the end date
    cy.get('[class="el-picker-panel el-date-range-picker"]')
      .should('not.be.visible')
    // Click Update button
    cy.get('.a-btn-primary')
      .should('be.enabled')
      .click()
    // Load the system by display the skeleton loading
    cy.get(':nth-child(2) > .el-skeleton > .el-skeleton__item')
      .should('be.visible')
  })

  it('Update Guest number', () =>{
    cy.wait(3000)
    // Click the 'Rooms' tab menu
    cy.get('[data-href="#accom-detail-rooms"]')
      .click()
    cy.wait(3000)
    // Click the Guest & Room info
    cy.get('#headlessui-popover-button-v-0-0-1-0')
      .click()
    // Ensure the Guest & Room form is displayed
    cy.get('.overflow-auto')
      .should('be.visible')
    // Reduce the Guest number
    // Click the - in the Adult
    cy.get(':nth-child(1) > .vue-number-input > .vue-number-input__button--minus')
      .should('be.enabled')
      .click()
    cy.get('[class="vue-number-input__input"]')
      .eq(0)
      .should('have.value', '2')
    // Click the - in the Children
    cy.get(':nth-child(2) > .vue-number-input > .vue-number-input__button--minus')
      .should('be.enabled')
      .click()
    cy.get('[class="vue-number-input__input"]')
      .eq(1)
      .should('have.value', '0')
    // Click the - in the Infant
    cy.get(':nth-child(3) > .vue-number-input > .vue-number-input__button--minus')
      .should('be.enabled')
      .click()
    cy.get('[class="vue-number-input__input"]')
      .eq(2)
      .should('have.value', '0')
    // Click Apply button
    cy.get('.overflow-auto > .t-btn-primary')
      .should('be.enabled')
      .click()
    // Click Update button
    cy.get('.a-btn-primary')
      .should('be.enabled')
      .click()
    // Load the system by display the skeleton loading
    cy.get(':nth-child(2) > .el-skeleton > .el-skeleton__item')
      .should('be.visible')
  })

  it('Update Room quantity', () =>{
    cy.wait(3000)
    // Click the 'Rooms' tab menu
    cy.get('[data-href="#accom-detail-rooms"]')
      .click()
    cy.wait(3000)
    // Click the Guest & Room info
    cy.get('#headlessui-popover-button-v-0-0-1-0')
      .click()
    // Reduce the Room number
    // Click the - in the Room
    cy.get(':nth-child(4) > .vue-number-input > .vue-number-input__button--minus')
      .should('be.enabled')
      .click()
    cy.get('[class="vue-number-input__input"]')
      .eq(3)
      .should('have.value', '1')
    // Click Apply button
    cy.get('.overflow-auto > .t-btn-primary')
      .click()
    // Click Update button
    cy.get('.a-btn-primary')
      .click()
    // Load the system by display the skeleton loading
    cy.get(':nth-child(2) > .el-skeleton > .el-skeleton__item')
      .should('be.visible')
  })

  it('Book Hotel', () => {
    // Click the 'Book Now' button
    cy.get('.accom-detail-overview-price > .t-btn-primary')
      .click()
    cy.get('#accom-detail-rooms')
      .scrollIntoView()
      .should('be.visible')
    // Click the 'Book Now' button in the hotel options
    cy.get(':nth-child(2) > .bg-slate-100 > :nth-child(1) > :nth-child(3) > .t-btn-primary')
      .should('be.enabled')
      .click()
    cy.wait(5000)
    // Redirect to Login page
    cy.origin('https://accounts.freya.travlr.com', () => {
      cy.url().should('include', '/login');
    })
  })

  it('Share with Facebook', () => {
    cy.get('[class="flex items-center cursor-pointer"]')
      .should('be.visible')
      .click()
    // The Share option pop up is displayed
    cy.get('#headlessui-dialog-panel-v-0-0-1-2-4')
      .should('be.visible')
    // The Facebook option is displayed
    cy.get('[aria-label="facebook share"]')
      .should('be.visible')
    cy.get('[class="t-icon icon-facebook-square mr-4"]')
      .should('be.visible')
    // Click the 'Facebook' option
    cy.get('[aria-label="facebook share"]')
      .click()
    // The button 'Facebook' has link to Facebook page
    cy.get('[aria-label="facebook share"]')
      .should('have.attr', 'href', 'https://www.facebook.com/sharer/sharer.php?u=https://wandr.freya.travlr.com/accommodation/detail/vibe-hotel-gold-coast?HotelCode=0128216&CheckIn=2025-08-01&CheckOut=2025-08-02&CurrencyCode=AUD&Provider=Expedia&GuestCounts[0][0][AgeQualifyingCode]=10&GuestCounts[0][0][Count]=2&GuestCounts[0][0][Age]=25&GuestCounts[0][1][AgeQualifyingCode]=7&GuestCounts[0][1][Count]=1&GuestCounts[0][1][Age]=1&GuestCounts[1][0][AgeQualifyingCode]=10&GuestCounts[1][0][Count]=1&GuestCounts[1][0][Age]=25&GuestCounts[1][1][AgeQualifyingCode]=8&GuestCounts[1][1][Count]=1&GuestCounts[1][1][Age]=7')
  })

  it('Share with X', () => {
    cy.get('[class="flex items-center cursor-pointer"]')
      .click()
    // The Share option pop up is displayed
    // The X option is displayed
    cy.get('[aria-label="x.com share"]')
      .should('be.visible')
    cy.get('[class="t-icon icon-twitter-x mr-4"]')
      .should('be.visible')
    // Click the 'X' option
    cy.get('[aria-label="x.com share"]')
      .click()
    // The button 'X' has link to X page
    cy.get('[aria-label="x.com share"]')
      .should('have.attr', 'href', 'https://twitter.com/intent/tweet?text=https://wandr.freya.travlr.com/accommodation/detail/vibe-hotel-gold-coast?HotelCode=0128216&CheckIn=2025-08-01&CheckOut=2025-08-02&CurrencyCode=AUD&Provider=Expedia&GuestCounts[0][0][AgeQualifyingCode]=10&GuestCounts[0][0][Count]=2&GuestCounts[0][0][Age]=25&GuestCounts[0][1][AgeQualifyingCode]=7&GuestCounts[0][1][Count]=1&GuestCounts[0][1][Age]=1&GuestCounts[1][0][AgeQualifyingCode]=10&GuestCounts[1][0][Count]=1&GuestCounts[1][0][Age]=25&GuestCounts[1][1][AgeQualifyingCode]=8&GuestCounts[1][1][Count]=1&GuestCounts[1][1][Age]=7')
  })

  it('Share with Email', () => {
    cy.get('[class="flex items-center cursor-pointer"]')
      .click()
    // The Share option pop up is displayed
    // The Email option is displayed
    cy.get('#headlessui-dialog-panel-v-0-0-1-2-4 > :nth-child(6)')
      .should('be.visible')
    cy.get('[xmlns="http://www.w3.org/2000/svg"]')
      .should('be.visible')
    // Click the 'Email' option
    cy.get('#headlessui-dialog-panel-v-0-0-1-2-4 > :nth-child(6)')
      .click()
    // The button 'Email' has link to Email page
    // cy.get('#headlessui-dialog-panel-v-0-0-1-2-4 > :nth-child(6)')
    //   .should('have.attr', 'href', 'mailto:')
  })

  it('Share with Copied link', () => {
    cy.get('[class="flex items-center cursor-pointer"]')
      .click()
    // The Share option pop up is displayed
    // The Copy Link option is displayed
    cy.get('#headlessui-dialog-panel-v-0-0-1-2-4 > :nth-child(3)')
      .should('be.visible')
    cy.get('[xmlns="http://www.w3.org/2000/svg"]')
      .should('be.visible')
    // Click the 'Copy Link' option
    cy.get('#headlessui-dialog-panel-v-0-0-1-2-4 > :nth-child(3)')
      .click()
    // The 'Copy Link' is change into 'Copied'
    cy.get('#headlessui-dialog-panel-v-0-0-1-2-4 > :nth-child(3) > .flex > span')
      .should('have.text', 'Copied')
    cy.wait(2000)
    // Change again to 'Copy Link'
    cy.get('#headlessui-dialog-panel-v-0-0-1-2-4 > :nth-child(3) > .flex > span')
      .should('have.text', 'Copy Link')
    })
})