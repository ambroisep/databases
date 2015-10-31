var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      models.users.get({username:req.body.username},function(err,data){
        if(err) return res.status(500).send(err);
        var userId = data[0].ID;
        models.rooms.get({roomname:req.body.roomname},function(err,data){
          if(err) return res.status(500).send(err);
          var roomId = data[0].ID;
          models.messages.post({roomid: roomId, userid: userId, message: req.body.message}, function(err, data) {
            if(err) return res.status(500).send(err);
            res.status(201).send([req.body]);
          });
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // models.users.get(req.body,function(err,resp){

      // })
    },
    post: function (req, res) {
      models.users.post(req.body,function(err,resp){
        if(err){
          var errCode = (err.code === 'ER_DUP_ENTRY' ? 400 : 500);
          return res.status(errCode).send(err);
        }
        res.status(201).send(resp);
      })


    }
  }
};

