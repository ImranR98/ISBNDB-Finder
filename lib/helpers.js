const https = require('https')

module.exports.sleep = (ms) => new Promise((resolve, reject) => { setTimeout(() => { resolve() }, ms) })

module.exports.httpGet = (options) => {
    return new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                resolve(data)
            })
        }).on("error", (err) => {
            reject(err)
        })
    })
}