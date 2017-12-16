var User = require('../modelos/users');
var crypto = require('crypto'),
    algorithm = 'aes256',
    password = 'd6F3Efeq';

class Users {
    nuevoUsuario(_user) {
        let user = new User();
        console.log(_user.password)

        user.email = _user.email
        user.displayName = _user.displayName
        let passwordEncryp = encrypt(_user.password);
        user.password = passwordEncryp
        user.signupDate = _user.signupDate
        user.lastLogin = _user.lastLogin
        return user.save();
    }
    buscarUsuario(username, password){
        let pass = encrypt(password);
        return User.findOne({"displayName": username,
        "password" : pass
    });
    }
}

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
module.exports = Users;