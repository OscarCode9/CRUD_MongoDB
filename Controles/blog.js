var Blog = require('../modelos/blog');


class BlogCRUD {
  obternerBlogPorId(id) {
    return Blog.findById(id);
  }
  guardarBlog(_blog) {
    let blog = new Blog();
    blog.titulo = _blog.titulo;
    blog.autor = _blog.autor;
    blog.body = _blog.body;
    blog.comentarios = [];
    blog.date = Date.now();
    blog.ocultar = true;
    blog.metadatos.likes = 0;
    blog.metadatos.liked = true;
    return blog.save();
  }
  todoLosBlogss(){
    return Blog.find({});
  }
  eliminarBlogPorId(id){
    return Blog.findById(id)
    .then(res =>{
      return res.remove()
    });
  }
  actualizarBlog(id, _blog){
    let update = _blog;
    return Blog.findByIdAndUpdate(id, update);
      
  }
}

module.exports = BlogCRUD;