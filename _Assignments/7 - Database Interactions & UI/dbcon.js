let mysql = require('mysql');
let express = require('express');
let bodyparser = require('body-parser');
let pool = mysql.createPool({
    // connectionLimit: 10,
    // host           : 'classmysql.engr.oregonstate.edu',
    // user           : 'cs290_matianc',
    // password       : 'Imperatrix@2',
    // database       : 'cs290_matianc'
    host: 'dev.database',
    user: 'root',
    password: 'default',
    database: 'workouts'
});

pool.query("Drop Table If Exists", function() {

    let createTable = "Create Table todo(" +
        "id INT PRIMARY KEY AUTO_INCREMENT," +
        "name VARCHAR(255) NOT NULL," +
        "reps INT," +
        "weight INT," +
        "units BOOLEAN," +
        "data DATE)";
    pool.query(createTable, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Todo Table Created");
    })

});

let gen = express();
let handlebars = require('express-handlebars').create({defaultLayout: 'main'});

gen.engine('handlebars', handlebars.engine);
gen.set('view engine', 'handlebars');
gen.set('port', 4000);
gen.use(bodyparser.urlencoded({extended: false}));
gen.use(bodyparser.json());
gen.use(express.static('public'));

gen.get('/', function(req, res) {
    res.render('form');
});

gen.get('/task', function(req, res) {

    let context = {};

    if (!req.query.id) {
        pool.query('SELECT * FROM todo', function(error, rows, fields) {
            if (error) {
                console.log(error);
                return;
            }
            context.results = JSON.stringify(rows);
            res.send(context);
        });
    }
    else {
        pool.query('SELECT * FROM todo WHERE id = ' + req.query.id, function(error, rows, fields) {
            if (error) {
                console.log(error);
                return;
            }
            context.results = JSON.stringify(rows);
            res.send(context);
        });
    }

});

gen.put('/tasks', function(req, res) {
    let units = req.query.units === 'kg' ? 0 : 1;
    pool.query('UPDATE todo SET name=?, rep=?, weight=?, date=?, units=? WHERE id=?', [req.query.name, req.query.rep, req.query.weight, req.query.date, units, req.query.id], function(error, result) {
        if (error) {
            console.log(error);
            return;
        }
        res.render('form');
    })
});

gen.posts('/tasks', function(req, res) {
    let body = req.body;
    let name = body.name === '' ? null : body.name;
    let reps = body.rep;
    let weight = body.weight;
    let date = body.date;
    let units = body.units === 'kg' ? 0 : 1;
    let values = "'" + name + "'," + reps + ',' + weight + ",'" + date + "'," + units;
    pool.query('INSERT INTO todo(name, rep, weight, date, units) VALUES(' + values + ');', function(error, rows, fields) {
        if(error) {
            console.log(error);
            return;
        }
        let data = JSON.stringify(rows);
        res.send(data);
    })
});

gen.post('/', function(req, res) {
    res.render('form');
});

gen.delete('/tasks', function(req, res) {
    let id = req.query.id;
    let context = {};
    pool.query('DELETE FROM todo WHERE id = ' + id, function(error, rows, fields) {
        if (error) {
            next(error);
            return;
        }
        context.results = JSON.stringify(rows);
        res.send(context);
    });
});

app.use(function(req, res) {
    res.status(404);
    res.render('400');
});

app.use(function(error, req, res, next) {
    console.log(error.stack);
    res.status(500);
    res.render('500');
});

gen.listen(gen.get('port'), function() {
    console.log('Express started on port 4000');
});