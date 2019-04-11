DROP DATABASE IF EXISTS bamazonSchema;
CREATE DATABASE bamazonSchema;

USE bamazonSchema;

CREATE TABLE products(
	item_id INTEGER(30) AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10, 2) default 0,
    stock_quantity INTEGER(20),
    primary key (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Master Sword Replica", "Swords", 35.00, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Mega Man X4", "Video Games", 8.99, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Evil Dead 2", "Movies", 9.96, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Buster Sword Replica", "Swords", 94.00, 3);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Shaq Fu", "Video Games", 2.98, 400);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Deadpool", "Movies", 12.96, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dungeons and Dragons Players Handbook", "Tabletop Games", 29.55, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Kobolds Ate My Baby", "Tabletop Games", 26.91, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Marvel vs. Capcom 2", "Video Games", 59.99, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("The Big Lebowski", "Movies", 9.84, 25);