const config = require('./lib/config').config
const helpers = require('./lib/helpers')
const ISBNDB = require('./lib/ISBNDB')

// TODO: Use OUTPUT_FILE, DESIRED_TAGS, and IMAGE_DIR

// Main App process
const app = async () => {
    config.validateConfig()

    const APIKey = config.API_KEY
    const ISBNs = config.INPUT_ISBNS
    const delay = config.REQ_DELAY_MS

    let results = []
    let errors = []

    for (let i = 0; i < ISBNs.length; i++) {
        try {
            results.push(await ISBNDB.getISBNDBBookDetails(APIKey, ISBNs[i]))
        } catch (err) {
            errors.push({ ISBN: ISBNs[i], error: err })
        }
        await helpers.sleep(delay)
    }

    console.log('Done.')
    console.log('\n\n\nResults:')
    console.log(results)
    console.log('\n\n\nErrors:')
    console.log(errors)
}

// Run App
app().catch(err => console.error(err))