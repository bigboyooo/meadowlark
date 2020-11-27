var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// app.use(function(req, res, next){
//   res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
//   next();
// });

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' &&
  req.query.test === '1'; next();
});

app.get('/', function(req, res){
  // res.type('text/plain');
  // res.send('Meadowlark Travel');
  res.render('home');
});

app.get('/about', function(req, res){
  // res.type('text/plain');
  // res.send('About Meadowlark Travel');
  var fortunes = [
    "Conquer your fears or they will conquer you.", "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
  ];
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', 
  { fortune: randomFortune, 
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', function(req, res){
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
  res.render('tours/request-group-rate');
});

app.use(function(req, res){
  // res.type('text/plain');
  res.status(404);
  // res.send('404 - Not Found');
  res.render('404');
});

app.use(function(req, res){
  console.error(err.stack);
  // res.type('text/plain');
  res.status(500);
  // res.send('500 - Server Error');
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});