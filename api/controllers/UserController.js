/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'registerUser': function (req, res) {
    res.locals.flash = _.clone(req.session.flash);
	  res.view();
    req.session.flash = {};
  },

  create : function (req, res, next) {

    User.create(req.params.all(), function userCreated (err, createdUser) {

      if(err) {
        console.log('An error has occurred. Details >>>', err);
        req.session.flash = {
          err: err
        };

        return res.redirect('/user/registerUser');
      }

      req.session.authenticated = true;
      req.session.User = createdUser;

      res.redirect('/user/show/' + createdUser.id );

      //To display our errors to client
      req.session.flash = {};
    });
  },

  show : function (req, res, next) {
    User.findOne(req.param('id'), function (err, createdUser) {
      if(err) return console.log(err);
      if(!createdUser) return next();
      res.view({
        user: createdUser
      })
    })
  },

  index: function (req, res, next) {


    User.find(function foundUsers (err, foundUsers) {
      if(err) return console.log(err);

      res.view({
        users: foundUsers
      })
    })
  },

  edit: function (req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, specificUser) {
      if(err) return console.log(err);
      if(!specificUser) return next('User doesn\'t exist.');

      res.view({
        user: specificUser
      })
    })
  },

  updateUser: function (req, res, next) {
    User.update(req.param('id'), req.params.all(), function sendEdits(err) {
      if(err) {
        console.log(err);
        res.redirect('/user/edit/' + req.param('id'));
      }

      // alert('You have updated' + req.param('userName') + 'successfully!');
      res.redirect('/user/show/' + req.param('id'));
    });
  },

  deleteUser: function (req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, specificUser) {
      if (err) return next(err);
      if (!specificUser) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/user');
    })
  }
};

