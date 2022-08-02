-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS HISTORY; 

CREATE TABLE IF NOT EXISTS HISTORY 
  ( 
     id           INT PRIMARY KEY auto_increment, 
     name         VARCHAR(45) UNIQUE NOT NULL, 
     dataId       VARCHAR(45) NOT NULL, 
     action       VARCHAR(45) NOT NULL,
     timestamp    timestamp NOT NULL DEFAULT current_timestamp()
  );