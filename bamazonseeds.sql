CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES
("Code Complete", "Books", 40, 30),
("Assorted Socks", "Clothing", 10, 100),
("Avengers: Infinity War", "DVDs", 30, 100),
("Harry Potter and the Cursed Child", "Books", 30, 20),
("World of Warcraft: Battle for Azeroth", "Video Games", 60, 100),
("Detroit: Become Human", "Video Games", 60, 20),
("Rush Hour", "DVDs", 10, 2),
("Interstellar", "DVDs", 20, 10),
("Monopoly", "Board Games", 20, 20),
("Mission Impossible", "DVDs", 10, 1);