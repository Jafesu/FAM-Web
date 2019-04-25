var express = require("express");
var login = require('./backend/routes/loginroutes');
var bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const session = require ('express-session');
var ejs = require('ejs');
const access = fs.createWriteStream(dir + 'logs/node.access.log', { flags: 'a' })
      , error = fs.createWriteStream(dir + 'logs/node.error.log', { flags: 'a' });

// redirect stdout / stderr
proc.stdout.pipe(access);
proc.stderr.pipe(error);

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/frontend/resources')));
app.use('/css', express.static(path.join(__dirname, '/frontend/resources/css')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/fonts',  express.static(path.join(__dirname, '/frontend/resources/fonts')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/frontend/resources/js')));
app.use('/images', express.static(path.join(__dirname, '/frontend/resources/images')));
app.use('/vendor', express.static(path.join(__dirname, '/frontend/resources/vendor')));

app.set('views', './frontend/views/');
app.set('view engine', 'ejs');

var router = express.Router();
// test route
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render(
            'index',
            {
                username: req.session.username,
                gender: req.session.gender,
                birthday: req.session.birthday,
                email: req.session.email,
                phone: req.session.phone,
                userid: req.session.userid,
            }
        );
    }else{
        res.render(
            'auth'
        );
    }
});

app.get('/loginpartial', function (req, res) { 
    res.render('partials/users/login');
});

app.get('/registerpartial', function (req, res) { 
    res.render('partials/users/register');
});

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
app.use('/api', router);
app.listen(5000);