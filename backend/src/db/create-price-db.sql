-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS PRICE; 

CREATE TABLE IF NOT EXISTS PRICE 
  ( 
     id           INT PRIMARY KEY auto_increment, 
     price        int(11) NOT NULL DEFAULT 0,
     updated_at   timestamp NOT NULL DEFAULT current_timestamp()
  );