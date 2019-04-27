var mysql = require('mysql');
const express = require('express');
const dbsettings = require('../settings/db.json');

const dbConfig = {
    host     : dbsettings.connection.host,
    user     : dbsettings.connection.user,
    password : dbsettings.connection.pass,
    database : dbsettings.connection.db
}

const profileRouter = express.Router();

function router(loggeduser, loggedin){


    profileRouter.route('/')
    .get((req, res) => {
        if(req.session.loggedin){
            res.redirect('/profile/'+req.session.username)
        }else{
            res.redirect('/')
        }
    })

    profileRouter.route('/create')
    .get((req, res) => {
        if(loggedin){
            (
                async function getResult(){
                
                    let connection;
                    try {
                
                      connection = await mysql.createConnection(dbConfig);
                      const result = await connection.query('SELECT * FROM profile WHERE user_id = ?',[userid], function (error, results, fields) {
                        if (error) {
                            console.log("error ocurred",error);
                        }else{
                            console.log(results);
                            console.log(results.length);
                            if(results.length > 0){
                                userdata = results[0]
                                console.log(results)
                                res.render(
                                'prifile/create',
                                {
                                    userdata
                                }
                                );
                            }else{
                                alert('Failed to create account please try again');
                                req.session.destroy(function(err) {
                                    if(err) {
                                      return next(err);
                                    } else {
                                      return res.redirect('/');
                                    }
                                  });
                            }
                        }
                        });
                     
                
                    } catch (err) {
                        console.log(err.stack);
                    }finally {
                      if (connection && connection.end) connection.end();
                    }
                
                }());
        }else{
            res.redirect('/')
        }
    });


    profileRouter.route('/:user')
    .get((req, res) => {
        const { user } = req.params;
        (
            async function getResult(){
            
                let connection;
                try {
            
                  connection = await mysql.createConnection(dbConfig);
                  const result = await connection.query('SELECT * FROM users WHERE username = ?',[user], function (error, results, fields) {
                    if (error) {
                        console.log("error ocurred",error);
                    }else{
                        userdata = results[0]
                        console.log(results)
                        res.render(
                          'profile/view',
                          {
                          }
                        );
                    }
                    });
                 
            
                } catch (err) {
                    console.log(err.stack);
                }finally {
                  if (connection && connection.end) connection.end();
                }
            
            }());
    });
    return profileRouter;
}

module.exports = router;



