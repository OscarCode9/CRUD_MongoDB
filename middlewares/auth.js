const jwt = require('../servicios/jwt');
const config = require('../config');

async function isAuth(req, res, next) {
    
    console.log(req.get('authorization'))

    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'No tienes autorizacion'
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        let resultToken = await jwt.verifyToken(token, config.SECRET_TOKEN, {});
        console.log(resultToken);
        next();

    } catch (e) {
        res.status(500).send({
            toke: 'Token no valido'
        })
    }

}

module.exports = isAuth