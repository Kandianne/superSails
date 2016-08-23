/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'newSession': function(req, res) {


	  //for flash alerts need to update so I won't have to include in every controller****
    res.locals.flash = _.clone(req.session.flash);
    req.session.flash = {};


    var authAge = 60000;
    var oldDateObj = new Date();
    var newDateObj = new Date(oldDateObj.getTime() + authAge);
    req.session.cookie._expires = newDateObj;
    req.session.cookie.originalMaxAge = authAge;
    req.session.authenticated = true;
    console.log(req.session);
    res.view('session/newSession')
  }
};

