const https = require('https')

module.exports.sleep = (ms) => new Promise((resolve, reject) => { setTimeout(() => { resolve() }, ms) })

module.exports.httpGet = async (options) => {
    let result = await new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                resolve({ data, status: resp.statusCode })
            })
        }).on("error", (err) => {
            reject(err)
        })
    })
    if (result.status != 200) throw result
    else return result.data
}