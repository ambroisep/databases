drop database chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  loginstatus TINYINT(1),
  username VARCHAR(20) NOT NULL,
  password CHAR(32),

  UNIQUE(username)

);

CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  roomname VARCHAR(20) NOT NULL,
  creator INT NOT NULL,

  FOREIGN KEY (creator)
    REFERENCES users(id)
);

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UserId INT NOT NULL,
  RoomId INT NOT NULL,
  message varchar(220) NOT NULL,

  FOREIGN KEY (UserId)
    REFERENCES users(id),
  FOREIGN KEY (RoomId)
    REFERENCES rooms(id)
);

insert into users (username,password) values ('will','pwd');
insert into users (username,password) values ('ambroise','pwd');
insert into rooms (roomname,creator) values ('Hello',1);
insert into messages (UserId,RoomId,message) values (1,1,"THIS BE TEST MESSAGE");

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

