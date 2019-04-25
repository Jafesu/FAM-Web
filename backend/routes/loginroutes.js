var mysql = require('mysql');
const dbsettings = require('../settings/db.json');
var crypto = require('crypto');


console.log(dbsettings);

var connection = mysql.createConnection({
  host     : dbsettings.connection.host,
  user     : dbsettings.connection.user,
  password : dbsettings.connection.pass,
  database : dbsettings.connection.db
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.register = function(req,res){
    console.log("req",req.body);
    var today = new Date();
    var users={
      "username":req.body.username,
      "email":req.body.email,
      "birthday":req.body.birthday,
      "gender":req.body.gender,
      "phone":req.body.phone,
      "created":today,
      "modified":today,
      "password":encrypt(req.body.password).substring(0,254)
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      connection.query('SELECT * FROM users WHERE email = ?',[req.body.email], function (error, results, fields) {
        if (error) {
          // console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          // console.log('The solution is: ', results);
          if(results.length >0){
            console.log(results)
            req.session.loggedin = true;
            req.session.username = results[0].username;
            req.session.gender = results[0].gender;
            req.session.birthday = results[0].birthday;
            req.session.email = results[0].email;
            req.session.phone = results[0].phone;
            req.session.userid = results[0].userid;
            res.redirect('/');
          }
        }
        });
    }
    });
  }


  exports.login = function(req,res){
    var email= req.body.email;
    var password = encrypt(req.body.password).substring(0,254)
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].password == password){
          req.session.loggedin = true;
          console.log(results)
          req.session.username = results[0].username;
          req.session.gender = results[0].gender;
          req.session.birthday = results[0].birthday;
          req.session.email = results[0].email;
          req.session.phone = results[0].phone;
          req.session.userid = results[0].userid;
          res.redirect('/');
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
              });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
    });
  }

  exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/');
  }