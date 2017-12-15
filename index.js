var mongoose = require('mongoose');
mongoose.Promise = Promise;
var app = require('./app');
var port = process.env.PORT || 3000;
var config = require('./config');

mongoose.connect(config.DB, (err,res) =>{
    if(err){
        return  new Error('Error en la conexion');
    }else{
        console.log('Conexion a la base de datos');
        app.listen(port, () =>{
            console.log(`API REST corriendo en ${port}`)
        })
    }
})