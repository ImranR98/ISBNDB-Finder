const helpers = require('./helpers')

// Request ISBNDB for the details of a book
module.exports.getISBNDBBookDetails = (APIKey, ISBN) => {
    const options = {
        hostname: 'api2.isbndb.com',
        path: '/book/' + ISBN,
        headers: {
            'Authorization': APIKey,
        }
    }
    return helpers.httpGet(options)
}