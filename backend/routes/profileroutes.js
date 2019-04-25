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
            res.render(
                'profile',
                {
                }
            )
        }else{
            res.redirect('/')
        }
    })


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
                          'viewProfile',
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



