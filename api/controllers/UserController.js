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
      // res.json(createdUser);

      res.redirect('/user/show/' + createdUser.id );

      //To display our errors to client
      req.session.flash = {};
    });
  },

  show : function (req, res, next) {
    User.findOne(req.param('id'), function (err, createdUser) {
      if(err) return console.log(next(err));
      if(!createdUser) return next();
      res.view({
        user: createdUser
      })
    })
  }
};

