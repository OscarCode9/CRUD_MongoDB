var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var formidable = require('express-formidable');
var Blog = require('./Controles/blog');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(formidable({
  encoding: 'utf-8',
  multiples: true // esta almacena archivos
}))

app.get('/blog', async(req, res, next) => {
  try {
    var blog = new Blog();
    const blogs = await blog.todoLosBlogss();
    res.send(blogs);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e)
  }
})
app.get('/blog/:id', async(req,res, next) =>{
  try{
    let blog = new Blog();
    let id = req.params.id;
    const  blogByid = await blog.obternerBlogPorId(id);
    res.send(blogByid);
  }catch(e){
    res.send(e);
  }
})

module.exports = app;