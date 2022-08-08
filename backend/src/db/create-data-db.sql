-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS DATA; 

CREATE TABLE IF NOT EXISTS DATA 
  ( 
     id           VARCHAR(45) PRIMARY KEY NOT NULL, 
     userId       INT NOT NULL, 
     refer        VARCHAR(45) UNIQUE NOT NULL, 
     price        VARCHAR(45) UNIQUE NOT NULL, 
     data_type    VARCHAR(45) UNIQUE NOT NULL, 
     species    VARCHAR(45) UNIQUE NOT NULL, 
     dogRace    VARCHAR(45) UNIQUE NOT NULL, 
     catRace    VARCHAR(45) UNIQUE NOT NULL, 
     birth    VARCHAR(45) UNIQUE NOT NULL, 
     sex    VARCHAR(45) UNIQUE NOT NULL, 
     weight    VARCHAR(45) UNIQUE NOT NULL, 
     created_at   timestamp NOT NULL DEFAULT current_timestamp(),
     timestamp    timestamp NOT NULL DEFAULT current_timestamp()
  );
--   작성중