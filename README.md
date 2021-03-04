# computer-detect-pic-api

This repo is the back-end for 'computer-detect-pic'.

# How to create database for this project
The project uses postgreSql database.

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(100),
    email text UNIQUE NOT NULL,
    entries bigint DEFAULT 0,
    joined timestamp NOT NULL
  );

  CREATE TABLE login (
    id serial PRIMARY KEY,
    hash varchar(100) NOT NULL,
    email text UNIQUE NOT NULL
  );
