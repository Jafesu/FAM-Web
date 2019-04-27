var mysql = require('mysql');
const express = require('express');
const dbsettings = require('../settings/db.json');

const dbConfig = {
    host     : dbsettings.connection.host,
    user     : dbsettings.connection.user,
    password : dbsettings.connection.pass,
    database : dbsettings.connection.db
}

const accountRouter = express.Router();

function router(){
    
    return accountRouter;

}

module.exports = router;