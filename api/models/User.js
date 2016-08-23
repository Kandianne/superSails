/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
    userName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    title: {
      type: 'string'
    },
    encryptedPassword: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  },


  beforeCreate: function (values, next) {
      //Checking to ensure password and password confirmation match before creating record
      if (!values.password || values.password != values.confirmation) {
        return console.log("Password error occurred", err);
      }


      //10 is number of rounds it does it's hashing
      bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
        if (err) return console.log('Password error occurred', err);
        console.log("encrypted password", values.encryptedPassword)
        values.encryptedPassword = encryptedPassword;
        next();
      });
  }
};

