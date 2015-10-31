drop database chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  username VARCHAR(20) NOT NULL,
  password CHAR(32),

  UNIQUE(username)

);

CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  roomname VARCHAR(20) NOT NULL,
  creator INT NOT NULL,

  FOREIGN KEY (creator)
    REFERENCES users(id)
);

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userid INT NOT NULL,
  roomid INT NOT NULL,
  message varchar(220) NOT NULL,

  FOREIGN KEY (userid)
    REFERENCES users(id),
  FOREIGN KEY (roomid)
    REFERENCES rooms(id)
);

insert into users (username,password) values ('will','pwd');
insert into rooms (roomname,creator) values ('Hello',1);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

