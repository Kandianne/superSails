/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
  'newSession': function (req, res) {


    //for flash alerts need to update so I won't have to include in every controller****
    res.locals.flash = _.clone(req.session.flash);
    req.session.flash = {};

    res.view('session/newSession')
  },

  createSession: function (req, res, next) {

    //Check email and password in params sent from form, if there's none
    if (!req.param('email') || !req.param('password')) {

      var usernamePasswordRequiredErr = [{
        name: 'userNamePasswordRequired',
        message: 'You must enter both the correct username and password to continue!'
      }];

      req.session.flash = {err: usernamePasswordRequiredErr};
      res.redirect('/session/newSession');
      return;
    }

    //dynamic finder which allows finding by specific attribute and not just findOne
    User.findOneByEmail(req.param('email'), function foundUser (err, user) {
      if (err) return next(err);

      if (!user) {
        var noAccountError = [{
          name: 'noAccount',
          message: 'The email address' + req.param('email') + 'not found.'
        }];

        req.session.flash = { err: noAccountError};
        res.redirect('/session/newSession');
        return;
      }

      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        if (!valid) {
          var usernamePasswordMismatchErr = [{
            name: 'username',
            message: 'Invalid username and password combination.'
          }];

          console.log(usernamePasswordMismatchErr);

          req.session.flash = { err: usernamePasswordMismatchErr };

          res.redirect('/session/newSession');
          return;
        }

        //If all successful log user in
        req.session.authenticated = true;
        req.session.User = user;

        res.redirect('/user/show/' + user.id);
      })
    })
  },

  destroy: function (req, res, next) {

    console.log("before logout", req.session);
    req.session.destroy();
    console.log("after logout", req.session);

    res.redirect('/session/newSession');
  }

};

