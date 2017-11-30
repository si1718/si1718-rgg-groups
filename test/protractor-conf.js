exports.config = { // To do a require in another file object
    seleniumAddress: 'http://localhost:9515',
    specs: ['T01-LoadData.js', 'T02-AddContact.js'],
    capabilities: {
        'browserName' : 'phantomjs'
    }
}