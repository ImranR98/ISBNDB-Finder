const helpers = require('./helpers')

// Request ISBNDB for the details of a book
module.exports.getISBNDBBookDetails = async (APIKey, ISBN, verbose = false) => {
    ISBN = ISBN.split('-').join('')
    if (verbose) console.log('Finding ISBN: ' + ISBN)
    const options = {
        hostname: 'api2.isbndb.com',
        path: '/book/' + ISBN,
        headers: {
            'Authorization': APIKey,
        }
    }
    return await helpers.httpGet(options)
    // Try the free OpenLibrary API if ISBNDB fails
    // let result = null
    // try {
    //     result = await helpers.httpGet(options)
    // } catch (err) {
    //     if (verbose) {
    //         console.log('ISBNDB request failed:')
    //         console.log(err)
    //         console.log('Attempting to find on OpenLibrary instead...')
    //     }
    //     let options2 = {
    //         hostname: 'openlibrary.org',
    //         path: '/api/books?bibkeys=ISBN:' + ISBN + '&jscmd=details&format=json'
    //     }
    //     result = JSON.parse(await helpers.httpGet(options2))
    //     if (Object.keys(result).length == 0) throw result
    // }
    // return result
}