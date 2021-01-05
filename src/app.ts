import fs from 'fs'

import { config } from './lib/config'
import { sleep, saveImageFromURL, objectToCSV, oneLineLog, nowString, mkdirIfNeeded } from './lib/helpers'
import { getISBNDBBookDetails } from './lib/ISBN'

const verbose = true

const standardLogPrefix = (index: number, total: number) => {
    return `${nowString()}: ISBN ${(index + 1)} of ${total}:`
}

// Main App process
const app = async () => {
    const APIKey = config.API_KEY
    const ISBNs = config.INPUT_ISBNS
    const delay = config.REQ_DELAY_MS
    const desiredTags = config.DESIRED_TAGS
    const imageDir = config.IMAGE_DIR
    const outputDir = config.OUTPUT_DIR

    if (verbose) oneLineLog(`${nowString()}: Preparing directories...`)
    mkdirIfNeeded(outputDir)
    if (imageDir) mkdirIfNeeded(imageDir)

    if (verbose) oneLineLog(`${nowString()}: Preparing output file...`)
    fs.writeFileSync(outputDir + '/results.csv', desiredTags.join(','))

    let detailsSaved = 0
    let imagesSaved = 0

    for (let i = 0; i < ISBNs.length; i++) {
        try {
            if (verbose) oneLineLog(`${standardLogPrefix(i, ISBNs.length)} Requesting details...`)
            let result = await getISBNDBBookDetails(APIKey, ISBNs[i])
            if (verbose) oneLineLog(`${standardLogPrefix(i, ISBNs.length)} Saving details...`)
            fs.appendFileSync(outputDir + '/results.csv', '\n' + objectToCSV(result, desiredTags))
            if (imageDir && result.image) {
                if (verbose) oneLineLog(`${standardLogPrefix(i, ISBNs.length)} Downloading image...`)
                await saveImageFromURL(result.image, imageDir, ISBNs[i])
                imagesSaved++
            } else if (imageDir) {
                oneLineLog('')
                console.warn(`${standardLogPrefix(i, ISBNs.length)} Image for '${ISBNs[i]}' was not found.`)
            }
            detailsSaved++
        } catch (err) {
            oneLineLog('')
            console.error(`${standardLogPrefix(i, ISBNs.length)} Error for '${ISBNs[i]}':`)
            console.error(err)
        }
        await sleep(delay)
    }

    if (verbose) {
        oneLineLog('')
        console.log(`${nowString()}: Finished. Saved ${detailsSaved} ISBN details and ${imagesSaved} images. Check above for any warnings or errors.`)
    }
}

// Run App
app().catch(err => {
    oneLineLog('')
    console.error(err)
})