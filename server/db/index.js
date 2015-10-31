var mysql = require('mysql');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pwd",
  database:"chat"
});




// Create a database connection and export it from this file.
// You will need to connect with the user "root", no  ,
// and to the database "chat".


con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = {
  con:con
}
