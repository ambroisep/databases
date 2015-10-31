var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.con.query('SELECT * from messages order by id DESC limit 100',function(err,data){
        if(err){
          return cb(err);
        }
        cb(null, data);
      });
    }, // a function which produces all the messages
    post: function (obj,cb) { //{roomId:something, etcccc}
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
      db.con.query("SELECT ID, USERNAME FROM users WHERE USERNAME = '" + userObj.username + "'", function(err,rows) {
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
      db.con.query("SELECT ID, ROOMNAME FROM rooms WHERE ROOMNAME = '" + roomObj.roomname + "'", function(err,rows) {
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

