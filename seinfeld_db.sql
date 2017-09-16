DROP DATABASE IF EXISTS seinfeld_db;
CREATE DATABASE seinfeld_db;

USE seinfeld_db;

CREATE TABLE actors(
  item_id INT NOT NULL AUTO_INCREMENT,
  actors_name VARCHAR(100) NULL,
  coolness_points INTEGER(255) NULL,
  attitude VARCHAR(100) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO actors (actors_name, coolness_points, attitude)
VALUES ("Jerry Seinfeld", 80, "Comedian");

INSERT INTO actors (actors_name, coolness_points, attitude)
VALUES ("Elaine Benes", 60 , "Intelligent");

INSERT INTO actors (actors_name, coolness_points, attitude)
VALUES ("George Constanza", 50, "Serious");

INSERT INTO actors (actors_name, coolness_points, attitude)
VALUES ("Cosmo Kramer", 100, "Goofy");

SELECT * FROM actors;
