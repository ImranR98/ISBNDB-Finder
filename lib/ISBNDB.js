const helpers = require('./helpers')

// Request ISBNDB for the details of a book
module.exports.getISBNDBBookDetails = async (APIKey, ISBN, verbose = false) => {
    if (verbose) console.log('Finding ISBN: ' + ISBN)
    const options = {
        hostname: 'api2.isbndb.com',
        path: '/book/' + ISBN,
        headers: {
            'Authorization': APIKey,
        }
    }
    const result = await helpers.httpGet(options)
    if (verbose) console.log(result)
    return result
}