var Blog = require('./Controles/blog');
var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.DB);
mongoose.Promise = Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
	let ids = [];
	var blog = new Blog();
	for (let i = 0; i <= 100; i++) {
		let miPrimerBlog = {
			titulo: 'Nodej en toda partes',
			autor: 'Oscar Martinez',
			body: 'Node es una gran plataforma'
		};
		let newBLog = await blog.guardarBlog(miPrimerBlog);
		ids.push(newBLog._id);
	}
	let buscarPorId = await blog.obternerBlogPorId(ids[1]);
	console.log(buscarPorId);

	let actualizar_ = {
		ocultar : true,
		body : "Node es una gran plataforma, con gran potencial",
		autor : "Oscar Martinez",
		titulo : "Nodej en toda partes",
		metadatos : {
				liked : true,
				likes : 50
		},
		date : Date.now(),
		comentarios : []

	}
	let actualizar = await blog.actualizarBlog(ids[1], actualizar_);
	let buscarPorId1= await blog.obternerBlogPorId(ids[1]);
	console.log(buscarPorId1)
	

	var todoLosblogs = await blog.todoLosBlogss();

	for(let i of ids){
		let buscarPorId = await blog.obternerBlogPorId(i);
		await blog.eliminarBlogPorId(i);
	}

	
	db.close();
});