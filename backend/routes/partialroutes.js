const express = require('express');

const partialRouter = express.Router();

function router(){
    // Authentication Partials
    partialRouter.route('/login')
    .get((req, res) => {
        res.render('partials/users/login');
    });
    
    partialRouter.route('/register')
    .get((req, res) => {
        res.render('partials/users/register');
    });



    // Page Partials
    
    partialRouter.route('/dashboard')
    .get((req, res) => {
      res.render('partials/pages/dashboard');
    });

    partialRouter.route('/color-palette')
    .get((req, res) => {
      res.render('partials/pages/color-palette');
    });

    partialRouter.route('/inbox')
    .get((req, res) => {
      res.render('partials/pages/inbox');
    });

    partialRouter.route('/chat')
    .get((req, res) => {
      res.render('partials/pages/chat');
    });
    
    partialRouter.route('/taskboard')
    .get((req, res) => {
      res.render('partials/pages/taskboard');
    });

    partialRouter.route('/calendar')
    .get((req, res) => {
      res.render('partials/pages/calendar');
    });

    partialRouter.route('/uikit/grid')
    .get((req, res) => {
      res.render('partials/pages/uikit/grid');
    });

    partialRouter.route('/uikit/typography')
    .get((req, res) => {
      res.render('partials/pages/uikit/typography');
    });
    
    partialRouter.route('/uikit/syntax-highlighter')
    .get((req, res) => {
      res.render('partials/pages/uikit/syntax-highlighter');
    });

    partialRouter.route('/uikit/helper-classes')
    .get((req, res) => {
      res.render('partials/pages/uikit/helper-classes');
    });

    partialRouter.route('/uikit/text-utilities')
    .get((req, res) => {
      res.render('partials/pages/uikit/text-utilities');
    });

    return partialRouter;
}
module.exports = router;
