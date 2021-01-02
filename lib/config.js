const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const fs = require('fs')

// Object to deal with getting configuration variable from environment variables
module.exports.config = {
    // Getters to parse and return each env. var.
    get API_KEY() {
        return process.env.API_KEY != undefined ? process.env.API_KEY.trim() : undefined
    },
    get INPUT_ISBNS() {
        return process.env.INPUT_ISBNS != undefined ? fs.readFileSync(process.env.INPUT_ISBNS.trim()).toString().split(',').map(ISBN => ISBN.trim()) : undefined
    },
    get OUTPUT_FILE() {
        return process.env.OUTPUT_FILE != undefined ? process.env.OUTPUT_FILE.trim() : undefined
    },
    get DESIRED_TAGS() {
        return process.env.DESIRED_TAGS != undefined ? process.env.DESIRED_TAGS.split(',').map(tag => tag.trim()) : undefined
    },
    get REQ_DELAY_MS() {
        return process.env.REQ_DELAY_MS != undefined ? Number.parseInt(process.env.REQ_DELAY_MS) : undefined
    },
    get IMAGE_DIR() {
        return process.env.IMAGE_DIR != undefined ? process.env.IMAGE_DIR.trim() : undefined
    },
    // Getting through this function w/o errors means that all env. vars are valid
    validateConfig() {
        let required = (
            this.API_KEY.length != 0 &&
            this.OUTPUT_FILE.length != 0 &&
            this.INPUT_ISBNS != undefined &&
            this.DESIRED_TAGS.length != 0 &&
            this.REQ_DELAY_MS != undefined
        )
        if (!required) throw 'Some env. vars. don\'t are missing or empty'
        let IMAGE_DIR = this.IMAGE_DIR
        if (IMAGE_DIR != undefined)
            if (!fs.statSync(IMAGE_DIR).isDirectory()) throw 'IMAGE_DIR env. var. is not a directory'
        fs.writeFileSync(this.OUTPUT_FILE, 'temporary file')
        fs.unlinkSync(this.OUTPUT_FILE)
    }
}