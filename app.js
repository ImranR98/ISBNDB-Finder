const fs = require('fs')

const config = require('./lib/config').config
const helpers = require('./lib/helpers')
const ISBNDB = require('./lib/ISBNDB')

const verbose = true

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
        if (verbose) console.log((i + 1) + ' of ' + ISBNs.length + '...')
        try {
            results.push(await ISBNDB.getISBNDBBookDetails(APIKey, ISBNs[i], verbose))
        } catch (err) {
            errors.push({ ISBN: ISBNs[i], error: err })
        }
        await helpers.sleep(delay)
    }

    console.log('Done. Found ' + results.length + ' results. Encountered ' + errors.length + ' errors.')

    fs.writeFileSync(config.OUTPUT_FILE, JSON.stringify({ results, errors }, null, '\t'))
}

// Run App
app().catch(err => console.error(err))