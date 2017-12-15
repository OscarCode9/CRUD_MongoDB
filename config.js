
let DB;
if (process.env.PRODUCCION === 'produc') {
    DB = process.env.DB;
} else {
    DB = 'mongodb://localhost:27017/blog'
}

var config = {
    DB: DB,
    SECRET_TOKEN: 'miclavedetokens'
}

module.exports = config;