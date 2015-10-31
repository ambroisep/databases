var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.con.query('SELECT m.message, u.username, r.roomname \
                    FROM messages m \
                    INNER JOIN users u ON m.userid = u.id \
                    INNER JOIN rooms r ON m.roomid = r.id',function(err,data){
        if(err){
          return cb(err);
        }
        cb(null, data);
      });
    }, // a function which produces all the messages
    post: function (obj,cb) { //{roomid:something, etcccc}
      db.con.query('INSERT into messages set ?', obj, function(err,data){
        if(err){
          return cb(err);
        }
        cb(null, data);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (userObj, cb) { //{ username: "Valjean" }
      db.con.query("SELECT id, username FROM users WHERE username = '" + userObj.username + "'", function(err,rows) {
        if(err) {
          return cb(err);
        } 
        cb(null, rows);
      });
    },
    post: function (userObj, cb) {
      db.con.query('INSERT INTO users set ?', userObj, function(err,res) {
        if(err){
          return cb(err);
        } 
        cb(null,res);
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (roomObj, cb) { //{ username: "Valjean" }
      db.con.query("SELECT id, roomname FROM rooms WHERE roomname = '" + roomObj.roomname + "'", function(err,rows) {
        if(err) {
          return cb(err);
        }
        cb(null, rows);
      });
    },
    post: function (roomObj, cb) {
      db.con.query('INSERT INTO rooms set ?', roomObj, function(err,res) {
        if(err){
          return cb(err);
        } 
        cb(null,res);
      });
    }
  }
};

