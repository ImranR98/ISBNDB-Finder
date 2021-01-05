import https from 'https'
import fs from 'fs'

export function sleep(ms: number) {
    new Promise<void>((resolve, reject) => { setTimeout(() => { resolve() }, ms) })
}

export async function httpGet(options: https.RequestOptions): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data: string = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                resolve(JSON.parse(data))
            })
        }).on("error", (err) => {
            reject(err)
        })
    })
}

export function objectToCSV(object: any, attributes: string[]) {
    let line = ''
    attributes.forEach((attribute, index) => {
        if (index != 0) line += ','
        if (object[attribute]) {
            let value: string = typeof object[attribute] == 'string' ? object[attribute] : JSON.stringify(object[attribute])
            value = '"' + value.split('"').join('""') + '"'
            line += object[attribute]
        }
    })
    return line
}

export function saveImageFromURL(imageURL: string, destDir: string, fileName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let extension: string = imageURL.split('.').pop() || 'jpeg' // TODO: Extension cannot reliably be inferred from the URL; find a way to get it
        let file = fs.createWriteStream(destDir + '/' + fileName + '.' + extension)
        https.get(imageURL, (response) => {
            response.pipe(file);
            response.on('end', () => {
                if (response.statusCode != 200) reject(response.statusMessage)
                else resolve()
            })
        })
    })
}

export function oneLineLog(value: string) {
    process.stdout.write("\r\x1b[K") // Delete anything on the current line
    process.stdout.write(value.split('\n').join('  ')) // Print value w/o adding a newline
}

export function nowString() {
    let now = new Date()
    let hour = now.getHours().toString()
    let minute = now.getMinutes().toString()
    hour.length == 1 ? hour = '0' + hour : null
    minute.length == 1 ? minute = '0' + minute : null
    return `${hour}:${minute}`
}

export function mkdirIfNeeded(dirPath: string) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
    if (!fs.statSync(dirPath).isDirectory()) throw dirPath + ' is not a directory'
}