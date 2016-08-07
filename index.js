var casper = require('casper').create({
  logLevel: 'debug',
  verbose: true,
  waitTimeout: 30000
})
casper.start()
casper.viewport(1024, 768)
//casper.thenOpen('https://pastel.diplomatie.gouv.fr/rdvinternet/html-3.04.03/frameset/frameset.html?lcid=1&sgid=260&suid=1') // SF
casper.thenOpen('https://pastel.diplomatie.gouv.fr/rdvinternet/html-3.04.03/frameset/frameset.html?lcid=1&sgid=174&suid=1') // LA

var bookingLink = ' Booking an appointment'
var agreeCheckbox = '#ccg'
var nextButton = '#boutonSuivant[src$="BoutSuivant.gif"]'
var calendar = '#compTableau_tbody'

casper.then(function findAndClickBookingLink () {
  this.echo('WAITING FOR BOOKING LINK')
  this.capture('booking.png')
  this.withFrame('BODY_WIN', function () {
    this.withFrame('MENU_WIN', function () {
      this.waitForText(bookingLink)
      this.then(function clickBookingLink () {
        this.clickLabel(bookingLink)
      })
    })
  })
})

casper.then(function findAndClickAgreeCheckbox () {
  this.echo('WAITING FOR ACCEPT CHECKBOX')
  this.capture('agree.png')
  this.withFrame('BODY_WIN', function () {
    this.withFrame('CONTENU_WIN', function () {
      this.waitForSelector(agreeCheckbox)
      this.thenClick(agreeCheckbox)
    })
  })
})

casper.then(function findAndClickNextButton () {
  this.echo('WAITING FOR NEXT BUTTON')
  this.capture('next.png')
  this.withFrame('BODY_WIN', function () {
    this.withFrame('CONTENU_WIN', function () {
      this.waitForSelector(nextButton)
      this.thenClick(nextButton)
    })
  })
})

casper.then(function findAndEchoCalendar () {
  this.echo('WAITING FOR CALENDAR')
  this.capture('calendar.png')
  this.withFrame('BODY_WIN', function () {
    this.withFrame('CONTENU_WIN', function () {
      this.waitUntilVisible(calendar)
      this.then(function() {
        var tableText = this.evaluate(function(calendar) {
          return document.querySelector(calendar)
            .innerText
        }, calendar)
        this.echo('CALENDAR: ' + tableText)
      })
    })
  })
})

casper.then(function () {
  this.capture('calendar.png')
})

casper.run()
