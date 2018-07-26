var express = require('express'),
multer = require('multer'),
swig = require('swig'),
path = require('path'),
mongoose = require('mongoose'),
app = express(); 

//app.use(express.logger());
app.use(express.urlencoded());

//app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname+'/views');



mongoose.connect('mongodb://simplonco:simplonco@ds145438.mlab.com:45438/blog');

var Article = mongoose.model('Article', {
	title: String,
	img: String, 
	content: String, 
	updated: Date
});

var Gallery = mongoose.model('Gallery', {
	title: String,
	img: String, 
	content: String, 
	tags: String, 
	updated: Date
});

var upload = multer({dest: __dirname + '/public/uploads'});



app.get('/', function(req, res){

	Article.find({}).sort({updated: -1}).exec(function(err, articles){              
		if(err){throw err;}

		data = {title: 'umanah', articles: articles};

		res.render('index', data);
	})

});

app.get('/causes', function(req, res){

	Article.find({}).sort({updated: -1}).exec(function(err, articles){              
		if(err){throw err;}

		data = {title: 'umanah', articles: articles};

		res.render('causes', data);
	})

});


app.get('/selfie', function(req, res){

	Gallery.find({}).sort({updated: -1}).exec(function(err, galleryy){               
		if(err){throw err;}
	
		data = {title: 'umanah', galleryy: galleryy};
		res.render('selfie', data);
	})

});


app.get('/article/:id', function(req, res){
	var article = Article.findById(req.params.id, function(err, article){              
		if(err){throw err}
			var data = {article: article, title: article.title};
		res.render('article', data);
	});
});

app.get('/gallery/:id', function(req, res){
	var gallery = Gallery.findById(req.params.id, function(err, gallery){            
		if(err){throw err}
			var data = {gallery: gallery, title: gallery.title};
		res.render('gallery', data);
	});
});



app.get('/create', function(req, res){                                             
	var data = {title: 'Ajouter un article'};
	res.render('create', data);
});

app.post('/create',upload.single('img'), function(req,res)
{

	console.log('req : ', req.file)                                                    
  	var article = new Article({
	title: req.body.titre,
	img: '/uploads/' + req.file.filename,
	content: req.body.contenu,
    updated: new Date(),
  });

  article.save(function(err, article){
    if(err){throw err;}
    res.render('created');
  });
});


app.get('/edit/:id', function(req, res){
	var article = Article.findById(req.params.id, function(err, article){           
		if(err){throw err}
		var data = {article: article,title: 'Modifier ' + article.title};
		res.render('edit', data);
	})
})

app.post('/update/:id',upload.single('img'), function(req, res){                      
	console.log(req.file)
	Article.update({ _id : req.params.id}, {
		title: req.body.titre,
		img: '/uploads/' + req.file.filename,
		content: req.body.contenu,
		updated: new Date(),
	},
	function(err){
		if(err){throw err;}
		res.redirect('/');
	}); 




app.get('/destroy/:id', function(req, res){
	Article.remove({ _id : req.params.id}, function(err){                            
		if(err){throw err;}
		res.redirect('/');
	});
});





app.post('/store', upload.single('img'), function(req, res){                       
	
	console.log('req.body : ', req.body)
	console.log('req.file : ', req.file)
	var article = new Article({
		title: req.body.titre,
		img: '/uploads/' + req.file.filename,
		content: req.body.contenu,
		updated: new Date(),
	});

	article.save(function(err, article){
		if(err){throw err;}                                                          
		res.render('created');
	});
});


	Gallery.update({ _id : req.params.id}, {                                           
		title: req.body.titre,
		img: '/uploads/' + req.file.filename,
		content: req.body.contenu,
		tags: req.body.tag,
		updated: new Date(),
	},
	function(err){
		if(err){throw err;}
		res.redirect('/selfie');
	});

});



app.post('/create-gallery',upload.single('img'), function(req,res)
{

	console.log('req : ', req.file)                                                   
  	var gallery = new Gallery({
	title: req.body.titre,
	img: '/uploads/' + req.file.filename,
	content: req.body.contenu,
	tags: req.body.tag,
    updated: new Date(),
  });

  gallery.save(function(err, article){                                                
    if(err){throw err;}
    res.render('created-gallery');
  });
});


app.get('/edit-gallery/:id', function(req, res){
	var gallery = Gallery.findById(req.params.id, function(err, gallery){             
		if(err){throw err}
		var data = {gallery: gallery,title: 'Modifier ' + gallery.title};
		res.render('edit-gallery', data);
	})
})


app.get('/destroyy/:id', function(req, res){
	Gallery.remove({ _id : req.params.id}, function(err){                               
		if(err){throw err;}
		res.redirect('selfie');
	});
});

app.get('/create-gallery', function(req, res){
	var data = {title: 'Ajouter un selfie'};                                          
	res.render('create-gallery', data);
});

app.post('/storee', upload.single('img'), function(req, res){
	
	console.log('req.body : ', req.body)
	console.log('req.file : ', req.file)
	var gallery = new Gallery({                                                        
		title: req.body.titre,
		img: '/uploads/' + req.file.filename,
		content: req.body.contenu,
		tags: req.body.tag,
		updated: new Date(),
	});

	gallery.save(function(err, gallery){
		if(err){throw err;}                                                             
		res.render('created-gallery');
	});
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);                                                    
console.log('App running http://localhost:3000');
