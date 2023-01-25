CREATE TABLE users (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   category VARCHAR(50) NOT NULL,
   cityid INT
);

CREATE TABLE products (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE cities (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE measures (
   id serial PRIMARY KEY,
   type VARCHAR(50) NOT NULL,
   weight INT NOT NULL
);

CREATE TABLE pickups (
   id serial PRIMARY KEY,
   date VARCHAR(50) NOT NULL,
   name VARCHAR(50) NOT NULL,
   cityid INT NOT NULL
);

CREATE TABLE subproducts (
   id serial PRIMARY KEY,
   productid INT NOT NULL,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE productmeasures (
   id serial PRIMARY KEY,
   productid INT,
   measureid INT NOT NULL,
   subproductid INT
);

CREATE TABLE productpicked (
   id serial PRIMARY KEY,
   amount INT NOT NULL,
   pickupid INT NOT NULL,
   productid INT,
   measureid INT NOT NULL,
   subproductid INT
);

CREATE TABLE urgentproducts (
   id serial PRIMARY KEY,
   productid INT NOT NULL,
   cityid INT NOT NULL
);

CREATE TABLE families(
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   cityid INT NOT NULL
);

CREATE TABLE familymembers(
   id serial PRIMARY KEY,
   familyid INT NOT NULL,
   name VARCHAR(50),
   gender VARCHAR(50),
   datebirth VARCHAR(50)
);

INSERT INTO families (id, name) VALUES (1, 'Lopez', 2);
INSERT INTO families (id, name) VALUES (2, 'Martinez', 2);

INSERT INTO familymembers (id, familyid, name, genre, datebirth) VALUES (1, 1, NULL, 'men', '09/06/1987');
INSERT INTO familymembers (id, familyid, name, genre, datebirth) VALUES (2, 1, NULL, 'women', '15/05/1984');
INSERT INTO familymembers (id, familyid, name, genre, datebirth) VALUES (3, 1, NULL, 'women', '17/08/2022');

INSERT INTO familymembers (id, familyid, name, genre, datebirth) VALUES (4, 2, NULL, 'women', '15/05/1984');
INSERT INTO familymembers (id, familyid, name, genre, datebirth) VALUES (5, 2, NULL, 'women', '17/08/2022');

CREATE UNIQUE INDEX productmeasures_unique ON productmeasures (measureid,productid);
CREATE UNIQUE INDEX subproductmeasures_unique ON productmeasures (measureid,subproductid);
CREATE UNIQUE INDEX productpicked_unique ON productpicked (measureid,pickupid,productid);
CREATE UNIQUE INDEX subproductpicked_unique ON productpicked (measureid,pickupid,subproductid);


INSERT INTO products (id, name) VALUES (1, 'Leche');
INSERT INTO products (id, name) VALUES (2, 'Sopas');
INSERT INTO products (id, name) VALUES (3, 'Salsas');
INSERT INTO products (id, name) VALUES (4, 'Pan');
INSERT INTO products (id, name) VALUES (5, 'Desayuno');
INSERT INTO products (id, name) VALUES (6, 'Harina');
INSERT INTO products (id, name) VALUES (7, 'Arroz');
INSERT INTO products (id, name) VALUES (8, 'Pasta');
INSERT INTO products (id, name) VALUES (9, 'Legumbres');
INSERT INTO products (id, name) VALUES (10, 'Aceite');
INSERT INTO products (id, name) VALUES (11, 'Azúcar');
INSERT INTO products (id, name) VALUES (12, 'Conservas');
INSERT INTO products (id, name) VALUES (13, 'Comida Infantil');
INSERT INTO products (id, name) VALUES (14, 'Bebidas');
INSERT INTO products (id, name) VALUES (15, 'Productos Congelados');
INSERT INTO products (id, name) VALUES (16, 'Huevos');
INSERT INTO products (id, name) VALUES (17, 'Fruta o verdura fresca');
INSERT INTO products (id, name) VALUES (18, 'Carne o pescado fresco');
INSERT INTO products (id, name) VALUES (19, 'Higiene');
INSERT INTO products (id, name) VALUES (20, 'Pañales');
INSERT INTO products (id, name) VALUES (21, 'Toallitas');


INSERT INTO subproducts (id, productid, name) VALUES (1, 5,'Galletas');
INSERT INTO subproducts (id, productid, name) VALUES (2, 5,'Bollería');
INSERT INTO subproducts (id, productid, name) VALUES (3, 13,'Potitos');
INSERT INTO subproducts (id, productid, name) VALUES (4, 13,'Papillas');
INSERT INTO subproducts (id, productid, name) VALUES (5, 19,'Compresas');
INSERT INTO subproducts (id, productid, name) VALUES (6, 19,'Tampones');
INSERT INTO subproducts (id, productid, name) VALUES (7, 20,'Talla 0');
INSERT INTO subproducts (id, productid, name) VALUES (8, 20,'Talla 1');
INSERT INTO subproducts (id, productid, name) VALUES (9, 20,'Talla 2');
INSERT INTO subproducts (id, productid, name) VALUES (10, 20,'Talla 3');
INSERT INTO subproducts (id, productid, name) VALUES (11, 20,'Talla 4');
INSERT INTO subproducts (id, productid, name) VALUES (12, 20,'Talla 5');
INSERT INTO subproducts (id, productid, name) VALUES (13, 20,'Talla 6');


INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (1, 6, NULL); /* Leche - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (2, 6, NULL); /* Sopas - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (3, 5, NULL); /* Salsas - 500ml */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (4, 5, NULL); /* Pan - 500ml */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (6, 3, NULL); /* Harina - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (7, 3, NULL); /* Arroz - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (8, 2, NULL); /* Pasta - 500mg */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (8, 3, NULL); /* Pasta - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (9, 3, NULL); /* Legumbres - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (10, 6, NULL); /* Aceite - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (11, 3, NULL); /* Azúcar - 1 kilo */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (12, 3, NULL); /* Conservas - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (14, 6, NULL); /* Bebidas - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (15, 6, NULL); /* Productos Congelados - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (16, 6, NULL); /* Huevos - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (17, 6, NULL); /* Fruta o verdura fresca - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (18, 6, NULL); /* Carne o pescaado fresco - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (20, 6, NULL); /* Pañales - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (21, 6, NULL); /* Toallitas - 1 litro */

INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 2, 1); /* Galletas - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 2, 2); /* Bollería - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 1, 3); /* Potitos - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 2, 4); /* Papillas - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 5); /* Compresas - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 6); /* Tampones - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 7); /* Talla 0 - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 8); /* Talla 1 - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 9); /* Talla 2 - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 10); /* Talla 3 - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 11); /* Talla 4 - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 12); /* Talla 5 - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 13); /* Talla 6 - 250g */


INSERT INTO users (name, password, category) VALUES ('pau', 'testing', 'Admin');
INSERT INTO users (name, password, category) VALUES ('paloma', 'testing', 'Admin');
INSERT INTO users (name, password, category, cityid) VALUES ('bcn1', 'testing', 'User', 2);
INSERT INTO users (name, password, category, cityid) VALUES ('vcn1', 'testing', 'User', 3);


INSERT INTO cities (name) VALUES ('Madrid');
INSERT INTO cities (name) VALUES ('Barcelona');
INSERT INTO cities (name) VALUES ('Valencia');
INSERT INTO cities (name) VALUES ('Sevilla');
INSERT INTO cities (name) VALUES ('Bilbao');


INSERT INTO measures (type, weight) VALUES ('250g', 0.25); -- 1
INSERT INTO measures (type, weight) VALUES ('500g', 0.5); -- 2
INSERT INTO measures (type, weight) VALUES ('1 Kilo', 1); -- 3
INSERT INTO measures (type, weight) VALUES ('250ml', 0.25); -- 4
INSERT INTO measures (type, weight) VALUES ('500ml', 0.5); -- 5
INSERT INTO measures (type, weight) VALUES ('1 Litro', 1); -- 6
INSERT INTO measures (type, weight) VALUES ('Talla 0', 0); -- 7
--INSERT INTO measures (type, weight) VALUES ('Talla 1', 0); -- 8
--INSERT INTO measures (type, weight) VALUES ('Talla 2', 0); -- 9
--INSERT INTO measures (type, weight) VALUES ('Talla 3', 0); -- 10
--INSERT INTO measures (type, weight) VALUES ('Talla 4', 0); -- 11
INSERT INTO measures (type, weight) VALUES ('1 Paquete', 0); -- 12


/* FUNCTIONS */

SELECT SETVAL('productmeasures_id_seq', 1);


/* RELOAD DATA */

DROP TABLE products, subproducts, productmeasures, productpicked;