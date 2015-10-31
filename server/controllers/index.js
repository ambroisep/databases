var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err,data){
        if(err) return res.status(500).send(err);
        return res.status(200).send({results:data});
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("THIS BE THE BODY!!!!!",req.body)
      models.users.get({username:req.body.username},function(err,data){
        if(err) return res.status(500).send(err);
        var userId = data[0].id;
        models.rooms.get({roomname:req.body.roomname},function(err,data){
          if(err) return res.status(500).send(err);
          var roomId = data[0].id;
          models.messages.post({roomid: roomId, userid: userId, message: req.body.message}, function(err, data) {
            if(err) return res.status(500).send(err);
            res.status(201).send([req.body]);
          });
        });
      });
    } // a function which handles posting a message to the database
  },


  login:{

    get:function(req,res){  //gonna use this for logout?
      models.session.terminate(req.body,function(err,resp){
        if(err){
          console.log(err);
          // var errCode = (err.code === 'ER_DUP_ENTRY' ? 400 : 500);
          return res.status(999).send(err);
        }
        console.log("IN THE LGOUT SECTION OF CONTROLLERSSSSS !!! MAKE SURE THIS IS WHAT YOU WANT");
      });
    },
    post:function(req,res){
      models.session.post(req.body,function(err,resp){
        if(err){
          console.log(err);
          // var errCode = (err.code === 'ER_DUP_ENTRY' ? 400 : 500);
          return res.status(999).send(err);
        }
        res.status(201).send(resp);
      });


    }

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
      });
    }
  }
};

