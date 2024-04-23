const fs = require('fs')

const dbPath = './db/db.json'

const guardarDB = ( data )=>{
    fs.writeFileSync(dbPath, JSON.stringify(data))
}

const leerDB = ()=>{
    if(!fs.existsSync(dbPath)){
        return null
    }
    let dbData = fs.readFileSync(dbPath,{ encoding:'utf-8', flag: 'r' })
    dbData = JSON.parse(dbData)
    return dbData
}

module.exports = {
    guardarDB,
    leerDB
}