import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const config = {
    get API_KEY() {
        if (process.env.API_KEY == undefined) throw 'process.env.API_KEY is undefined'
        return process.env.API_KEY
    },
    get INPUT_ISBNS() {
        if (process.env.INPUT_ISBNS == undefined) throw 'process.env.INPUT_ISBNS is undefined'
        return fs.readFileSync(process.env.INPUT_ISBNS.trim()).toString().split('\n').join(',').split(',').map(ISBN => ISBN.trim()).filter(ISBN => ISBN != '')
    },
    get OUTPUT_FILE() {
        if (process.env.OUTPUT_FILE == undefined) throw 'process.env.OUTPUT_FILE is undefined'
        return process.env.OUTPUT_FILE.trim()
    },
    get DESIRED_TAGS() {
        if (process.env.DESIRED_TAGS == undefined) throw 'process.env.DESIRED_TAGS is undefined'
        return process.env.DESIRED_TAGS.split(',').map(tag => tag.trim())
    },
    get REQ_DELAY_MS() {
        if (process.env.REQ_DELAY_MS == undefined) throw 'process.env.REQ_DELAY_MS is undefined'
        return Number.parseInt(process.env.REQ_DELAY_MS)
    },
    get IMAGE_DIR() {
        if (process.env.IMAGE_DIR == undefined) return null
        return process.env.IMAGE_DIR.trim()
    }
}