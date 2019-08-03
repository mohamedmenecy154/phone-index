

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
    user: 'bxvrblkzegbayy',
    host: 'ec2-50-19-221-38.compute-1.amazonaws.com',
    database: 'dafsqupq0ib8ok',
    password: '33a34082ee00699f917c4467dd7fc10d7c45cfecb03bb8e672975b839245eb4b',
    port: 5432,
    ssl:true
});
//connect to database
client.connect();
//database cmd
client.query("create table index (id serial,name text,phone text)");
// ##########################################################################################################################################
//
app.get('/', function (req, res) { res.render('home') });
app.get('/signup', function (req, res) { res.render('sign_up') });
app.get('/add', function (req, res) { res.render('add',{isadded:1}) });
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
client.query("INSERT INTO index (name,phone) VALUES ('"+name+"','"+phone+"')",function(err,ress){
   if(err){ res.render('add',{isadded:3})}else{res.render('add',{isadded:2})}


})

})

app.post('/search',function(req,res){
var name = req.body.search;
client.query("SELECT * FROM index WHERE name like '"+name+"%' limit 10",function(err,RES){
    res.send(RES)
})
})
// ##########################################################################################################################################
app.listen(PORT, function () { console.log('Phone index started') });