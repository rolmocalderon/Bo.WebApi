DROP DATABASE "d6tirr3ic3t3r9";

CREATE TABLE [IF NOT EXISTS] users (
   id INT serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   category VARCHAR(50) NOT NULL,
   cityid INT
);

CREATE TABLE [IF NOT EXISTS] products (
   id INT serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE [IF NOT EXISTS] cities (
   id INT serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,,
);

CREATE TABLE [IF NOT EXISTS] measures (
   id INT serial PRIMARY KEY,
   type VARCHAR(50) NOT NULL,
   weight INT NOT NULL
);

CREATE TABLE [IF NOT EXISTS] pickups (
   id INT serial PRIMARY KEY,
   date VARCHAR(50) NOT NULL,
   name VARCHAR(50) NOT NULL,
   cityid INT NOT NULL
);

CREATE TABLE [IF NOT EXISTS] subproducts (
   id INT serial PRIMARY KEY,
   productid INT NOT NULL,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE [IF NOT EXISTS] productmeasures (
   id INT serial PRIMARY KEY,
   productid INT NOT NULL,
   measureid INT NOT NULL,
   subproductid INT NOT NULL
);

CREATE TABLE [IF NOT EXISTS] productmeasures (
   id INT serial PRIMARY KEY,
   amount INT NOT NULL,
   pickupid INT NOT NULL,
   productid INT NOT NULL,
   measureid INT NOT NULL,
   subproductid INT NOT NULL
);

CREATE UNIQUE INDEX productmeasures_unique ON productmeasures (measureid,pickupid,productid);
CREATE UNIQUE INDEX subproductmeasures_unique ON productmeasures (measureid,pickupid,subproductid);

INSERT INTO products (name) VALUES ('Leche');
INSERT INTO products (name) VALUES ('Pasta');
INSERT INTO products (name) VALUES ('Legumbre');
INSERT INTO products (name) VALUES ('Arroz');
INSERT INTO products (name) VALUES ('Sopas');
INSERT INTO products (name) VALUES ('Conservas');
INSERT INTO products (name) VALUES ('Salsas');
INSERT INTO products (name) VALUES ('Azúcar');
INSERT INTO products (name) VALUES ('Harina');
INSERT INTO products (name) VALUES ('Aceite');
INSERT INTO products (name) VALUES ('Potitos');
INSERT INTO products (name) VALUES ('Papillas');
INSERT INTO products (name) VALUES ('Leche Infantil');
INSERT INTO products (name) VALUES ('Pañales');
INSERT INTO products (name) VALUES ('Toallitas');
INSERT INTO products (name) VALUES ('Galletas o Bollería');
INSERT INTO products (name) VALUES ('Higiene');

INSERT INTO subproducts (productid, name) VALUES (17,'Champú o Gel');
INSERT INTO subproducts (productid, name) VALUES (17,'Compresas');
INSERT INTO subproducts (productid, name) VALUES (17,'Tampones');

INSERT INTO cities (name) VALUES ('Madrid');
INSERT INTO cities (name) VALUES ('Barcelona');
INSERT INTO cities (name) VALUES ('Valencia');
INSERT INTO cities (name) VALUES ('Sevilla');
INSERT INTO cities (name) VALUES ('Bilbao');

INSERT INTO measures (type, weight) VALUES ('250g', 0.25);
INSERT INTO measures (type, weight) VALUES ('500g', 0.5);
INSERT INTO measures (type, weight) VALUES ('1 Kilo', 1);
INSERT INTO measures (type, weight) VALUES ('Talla 0', 0);
INSERT INTO measures (type, weight) VALUES ('Talla 1', 0);
INSERT INTO measures (type, weight) VALUES ('Talla 2', 0);
INSERT INTO measures (type, weight) VALUES ('Talla 3', 0);
INSERT INTO measures (type, weight) VALUES ('Talla 4', 0);
INSERT INTO measures (type, weight) VALUES ('1 Paquete', 0);
INSERT INTO measures (type, weight) VALUES ('1 Litro', 1);
INSERT INTO measures (type, weight) VALUES ('250ml', 0.25);
INSERT INTO measures (type, weight) VALUES ('500ml', 0.5);

INSERT INTO users (name, password, category, cityid) VALUES ('pau', 'testing', 'Admin');
INSERT INTO users (name, password, category, cityid) VALUES ('paloma', 'testing', 'Admin');
INSERT INTO users (name, password, category, cityid) VALUES ('bcn1', 'testing', 'User', 2);
INSERT INTO users (name, password, category, cityid) VALUES ('vcn1', 'testing', 'User', 3);