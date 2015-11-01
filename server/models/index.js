/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "pwd");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  message: Sequelize.STRING,
});

var Room = sequelize.define('Room', {
  roomname:Sequelize.STRING
});

// User.hasMany(Message);
User.hasMany(Room,{as:"creator"});
Message.belongsTo(User);

Room.hasMany(Message,{as:"room"})
Message.belongsTo(Room)
// Room.belongsTo(User, {as:"Creator"});


// Room.belongsTo(User,{foreignKey:"CreatorId", allowNull: false,as:"creator"})

// Message.belongsTo(Rooms)


/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */


User.sync().then(function(e) {
  // /* This callback function is called once sync succeeds. */

  // // now instantiate an object and save it:
  // var newUser = Users.build({username: "Jean Valjean",password:"poo"});
  // newUser.save().then(function() {

  //   /* This callback function is called once saving succeeds. */

  //   // Retrieve objects from the database:
  //   Users.findAll({ where: {username: "Jean Valjean"} }).then(function(usrs) {
  //     // This function is called back with an array of matches.
  //     for (var i = 0; i < usrs.length; i++) {
  //       console.log(usrs[i].username + " exists");
  //     }
  //   }); 
  // });
  console.log("Successfully created users ... ")
User.create({username: "Jean Valjean",password:"poo"}).then(function(e){console.log("Successfully created user")}).catch(function(e){console.log("ERROR CREATING SEED USER",e)})
}).catch(function(e){
  console.log("You fucked up in USERS",e);
});

Message.sync().then(function(e){
  console.log("successfully created messages ...")
Message.create({UserId: 1,message:"THIS ISS A TEST",roomid:1}).then(function(e){console.log("Successfully MESSAGE")}).catch(function(e){console.log("ERROR CREATING SEED MESSAGE",e)})
}).catch(function(e){
  console.log("You fucked up in MESSSAGES",e)
})

Room.sync().then(function(e){
  console.log("successfully created rooms ...")
Room.create({creator: 1,roomname:"TestRoom"}).then(function(e){console.log("Successfully ROOM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")}).catch(function(e){console.log("ERROR CREATING SEED ROOM",e)})
}).catch(function(e){
  console.log("Problem making room",e)
})





// var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      Message.findAll( { include:[User] }).then(function(e){
        cb(null,e);
      }).catch(function(e){
        cb(e,null)
      })
    }, // a function which produces all the messages
    post: function (obj,cb) { //{roomid:something, etcccc}
      Message.create(obj).then(function(e){
        cb(null,e);
      }).catch(function(e){
        cb(e,null)
      })
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
  session:{

    get: function (userObj, cb) { //{ username: "Valjean", id: 1}
      db.con.query("SELECT loginstatus, username FROM users WHERE id = '" + userObj.id + "'", function(err,rows) {
        if(err) {
          return cb(err);
        } 
        cb(null, rows);
      });
    },
    terminate:function(userObj,cb){
      db.con.query('UPDATE users set loginstatus = 0 where id = ' + userObj.id, function(err,res) {
        if(err){
          return cb(err);
        } 
        cb(null,res);
      });
    },
    post: function (userObj, cb) {
      db.con.query('UPDATE users set loginstatus = 1 where id = ' + userObj.id, function(err,res) {
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

