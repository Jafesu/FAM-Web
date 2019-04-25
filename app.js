var express = require("express");
var login = require('./backend/routes/loginroutes');
var bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const session = require ('express-session');
var ejs = require('ejs');
const fs = require('fs')


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
app.use('/bower_components', express.static(path.join(__dirname, '/frontend/resources/bower_components')));

app.set('views', './frontend/views/');
app.set('view engine', 'ejs');

var router = express.Router();

app.use(function(req, res, next) {
    res.locals.first = req.session.first;
    res.locals.last = req.session.last;
    res.locals.username = req.session.username;
    res.locals.first = req.session.first;
    res.locals.last = req.session.last;
    res.locals.gender = req.session.gender;
    res.locals.birthday = req.session.birthday;
    res.locals.email = req.session.email;
    res.locals.phone = req.session.phone;
    res.locals.userid = req.session.userid;
    res.locals.loggedin = req.session.loggedin;
    res.locals.regmonth = req.session.regmonth;
    res.locals.regday = req.session.regday;
    res.locals.regyear = req.session.regyear;
    next();
  });
const profileRouter = require('./backend/routes/profileroutes')();

app.use('/profile', profileRouter);

// test route
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render(
            'index',
            {
                
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







// app.get('/profile', (req, res) => {
//     if (req.session.loggedin) {
//         res.render('profile',
//             {
//                 loggedin: true,
//                 username: req.session.username,
//                 first: req.session.first,
//                 last: req.session.last,
//                 gender: req.session.gender,
//                 birthday: req.session.birthday,
//                 email: req.session.email,
//                 phone: req.session.phone,
//                 userid: req.session.userid,
//                 regmonth: req.session.regmonth,
//                 regday: req.session.regday,
//                 regyear: req.session.regyear
//             }
//         )
//     }else {
//         res.render('profile',
//             {
//                 loggedin: false
//             }
//         )
//     }
// })

// app.get('/profile/:username', (req, res) => {
//     if (req.session.loggedin) {
//         res.render('profile',
//             {
//                 loggedin: true,
//             }
//         )
//     }else {
//         res.render('profile',
//             {
//                 loggedin: false
//             }
//         )
//     }
// })