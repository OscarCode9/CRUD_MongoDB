var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var formidable = require('express-formidable');
var Blog = require('./Controles/blog');
var Users = require('./Controles/user');
var jwt = require('./servicios/jwt')
var config = require('./config');
var auth = require('./middlewares/auth');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(formidable({
  encoding: 'utf-8',
  multiples: true // esta almacena archivos
}))

app.get('/blog',auth, async(req, res, next) => {
  try {
    var blog = new Blog();
    const blogs = await blog.todoLosBlogss();
    res.status(200).send(blogs);
  } catch (e) {
    res.status(500).send(e)
  }
})
app.get('/blog/:id', async(req,res, next) =>{
  try{
    let blog = new Blog();
    let id = req.params.id;
    const  blogByid = await blog.obternerBlogPorId(id);
    res.status(200).send(blogByid);
  }catch(e){
    res.status(500).send(e);
  }
})
app.delete('/blog/:id', async(req, res, next)=>{
  console.log(req.params.id);
  try{
    let blog = new Blog();
    let id = req.params.id;
    let blogByid = await blog.eliminarBlogPorId(id);
    res.status(200).send("Se ha borrado blog con id: "+blogByid._id)
  }catch(e){
    res.status(500).send(e)
  }
})
app.put('/blog/:id', async(req, res, next)=>{
  console.log(req.fields);
  try {
    let blog = new Blog();
    let id = req.params.id;
    let blogByid = await blog.actualizarBlog(id, req.fields);
    blogByid = await blog.obternerBlogPorId(id);
    res.status(200).send(blogByid);
  } catch (error) {
    res.status(500).send(error)
  }
 
})

app.post('/blog', auth, async(req, res, next)=>{
  try{
    let blog = new Blog();
    let nuevoBlog = await blog.guardarBlog(req.fields);
    res.status(200).send(nuevoBlog);
  } catch(e){
    res.status(500).send(e)
  }
});

app.get('/token', async (req, res, next)=>{
  //req.query.username
  //req.query.password
  let user = new Users();
  let myuser = await user.buscarUsuario(String(req.query.username),String(req.query.password));
  if(myuser === null){
    res.status(500).send({error: 'Este usuario no existe o la contraseña no es correcta'});
  }else{
    myuser.password = null;
    const payload = {
      sub: myuser._id,
      name: myuser.displayName,
      admin: true
    }
    let token = await jwt.signToken(payload, config.SECRET_TOKEN,{});
    console.log(token);
    res.status(200).send({token, user: myuser});
  }
})

module.exports = app;