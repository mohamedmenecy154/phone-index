

var express = require('express');
var app = express();
//database postgresql
var pg = require('pg');
const PORT = process.env.PORT || 5000;
app.use(express.static('public'));
app.set('view engine', 'ejs');
//get data from post requests from front end
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// const client = new pg.Client(process.env.DATABASE_URL);

//online datbase settings 
const client = new pg.Client({
    user: 'ieqesefgnvpaii',
    host: 'ec2-23-21-177-102.compute-1.amazonaws.com',
    database: 'd11jnjirlnrsc1',
    password: '5b446d3cae94f6a4de9fe5115a95b803ebc3e882192404d35abf213a40c487ad',
    port: 5432,
    ssl:true
});
//connect to database
client.connect();
//database cmd
client.query("create table index (id serial,name text,phone text,time timestamp default now())");
// ##########################################################################################################################################
//
app.get('/', function (req, res) { res.render('home') });
app.get('/signup', function (req, res) { res.render('sign_up') });
app.get('/add', function (req, res) { res.render('add') });
app.get('/signin', function (req, res) { res.render('sign_in') });
app.get('/search', function (req, res) { res.render('search') });
// ##########################################################################################################################################
app.post('/register',function(req,res){
    console.log(req.body)

})
app.post('/sigin',function(req,res){
    console.log(req.body)

})
app.post('/add',function(req,res){
    var name = req.body.name;
    var phone = req.body.phone;
client.query("INSERT INTO index (name,phone) VALUES ("+name+","+phone+")",function(err,res){
    if(!err){res.render('add')}
})

    console.log(req.body);
})
// ##########################################################################################################################################
app.listen(PORT, function () { console.log('Phone index started') });