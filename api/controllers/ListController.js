/**
 * ListController
 *
 * @description :: Server-side logic for managing a list of items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'createItem': function (req, res) {
    res.view();
  },

  create: function (req, res, next) {
    Item.create(req.params.all(), function (err, createdItem) {
      if(err) {
        return console.log(err);
      }

      // res.json(createdItem);
      res.redirect('/list/showList')
    })
  },

  showList: function (req, res) {
    Item.find(function findItems (err, foundItems) {
      if(err) {
        return console.log(err);
      }

      res.view({
        items: foundItems
      })
    })
  }

};
