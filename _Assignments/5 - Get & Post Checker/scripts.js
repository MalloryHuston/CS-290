let express = require('express');
let app = express();
let handlebars = require('express-handlebars').create({defaultLayout:'main'});
let bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 57864);

app.get('/',function(req, res){

    let urlArray = [];

    for(let key in req.query) {
        urlArray.push({'name': key, 'value': req.query[key]});
    }

    let context = {};
    context.list = urlArray;
    context.type = 'GET';

    res.render('handler', context);
});

app.post('/', function(req, res) {
    let urlArray = [];

    for(let target in req.body) {
        urlArray.push({'name': target, 'value': req.body[target]});
    }

    let context = {};
    context.list = urlArray;
    context.type = 'POST';

    res.render('handler', context);
});

app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});