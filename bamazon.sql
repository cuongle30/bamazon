CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
sku INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NULL,
department_name VARCHAR(30) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (sku)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ironman", "toy", 29.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Free", "clothes", 99.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Jeans", "clothes", 69.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "electronics", 749.99, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "electronics", 699.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gloves", "clothes", 24.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batman", "toy", 29.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Belt", "clothes", 39.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Portible Charger", "electronics", 39.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "clothes", 149.99, 35);