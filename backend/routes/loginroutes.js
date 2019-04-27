var mysql = require('mysql');
const dbsettings = require('../settings/db.json');
var crypto = require('crypto');
var alert = require('alert-node');

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
function createdDate(date){
  var year = date.substring(0, 4)
  var month = date.substring(5, 7)
  var day = date.substring(8, 10)

  switch (month) {
    case '01':
      month = 'Jan';
      break;
    case '02':
      month = 'Feb';
      break;
    case '03':
      month = 'Mar';
      break;
    case '04':
      month = 'April';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'June';
      break;
    case '07':
      month = 'July';
      break;
    case '08':
      month = 'Aug';
      break;
    case '09':
      month = 'Sept';
      break;
    case '10':
      month = 'Oct';
      break;
    case '11':
      month = 'Nov';
      break;
    case '12':
      month = 'Dec';
      break;
  }
  return [month, day, year];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getDefaultAvatar(gender){
  var avatar;
  if(gender === 'Male'){
    ppid = getRandomInt(3);
    switch (ppid) {
      case 0:
        avatar =  '/images/users/default_avatars/avatar.png'
        break;
      case 1:
        avatar =  '/images/users/default_avatars/avatar4.png'
        break;
      case 2:
        avatar =  '/images/users/default_avatars/avatar5.png'
        break;
      default:
        break;
    }
  }else if(gender === 'Female'){
    ppid = getRandomInt(2);
    switch (ppid) {
      case 0:
        avatar =  '/images/users/default_avatars/avatar2.png'
        break;
      case 1:
        avatar =  '/images/users/default_avatars/avatar3.png'
        break;
      default:
        break;
    }
  }else{
    ppid = getRandomInt(5);
    switch (ppid) {
      case 0:
        avatar =  '/images/users/default_avatars/avatar.png'
        break;
      case 1:
        avatar =  '/images/users/default_avatars/avatar4.png'
        break;
      case 2:
        avatar =  '/images/users/default_avatars/avatar5.png'
        break;
      case 3:
        avatar =  '/images/users/default_avatars/avatar2.png'
        break;
      case 4:
        avatar =  '/images/users/default_avatars/avatar3.png'
        break;
      default:
        break;
    }
  }
  return avatar;
}

function login(req, results){
  
}

exports.register = function(req,res){
    console.log("req",req.body);
    var today = new Date();
    var users={
      "username":req.body.username,
      "email":req.body.email,
      "phone":req.body.phone,
      "created":today,
      "modified":today,
      "password":encrypt(req.body.password).substring(0,254)
    }
    connection.query('SELECT * FROM users WHERE email = ?',[req.body.email], function (error, results, fields) {
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length === 0){
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
                    console.log(results[0].pp);
        
                    req.session.loggedin = true;
                    req.session.username = results[0].username;
                    req.session.regmonth = createdDate(results[0].created)[0];
                    req.session.regday = createdDate(results[0].created)[1];
                    req.session.regyear = createdDate(results[0].created)[2];
                    req.session.email = results[0].email;
                    req.session.phone = results[0].phone;
                    req.session.userid = results[0].userid;
                    res.redirect('/profile/create');
                    
                  }
                }
                });
            }
            });
        }else{
          alert('Account already exists with that email please try again', 'window');
          res.redirect('/');
        }
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
          req.session.username = results[0].username;
          req.session.regmonth = createdDate(results[0].created)[0];
          req.session.regday = createdDate(results[0].created)[1];
          req.session.regyear = createdDate(results[0].created)[2];
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