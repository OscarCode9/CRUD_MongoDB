var User = require('./Controles/user');
var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.DB);
mongoose.Promise = Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
	let ids = [];
    var user = new User();
    let nuevoUsuario = {
        email : 'oscar@gmail.com',
        displayName: 'trisate99',
        password: 'oscar99',
        signupDate: Date.now(),
        lastLogin: Date.now()
    }
    

    let user1 = await user.buscarUsuario(nuevoUsuario.displayName,nuevoUsuario.password);
    console.log(user1)
	

	
	db.close();
});