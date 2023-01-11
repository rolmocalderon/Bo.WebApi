DROP DATABASE "d6tirr3ic3t3r9";

CREATE TABLE users (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   category VARCHAR(50) NOT NULL,
   cityid INT
);

CREATE TABLE products (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   monthlyaverage NUMERIC DEFAULT 0 NOT NULL
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

CREATE UNIQUE INDEX productmeasures_unique ON productmeasures (measureid,productid);
CREATE UNIQUE INDEX subproductmeasures_unique ON productmeasures (measureid,subproductid);
CREATE UNIQUE INDEX productpicked_unique ON productpicked (measureid,pickupid,productid);
CREATE UNIQUE INDEX subproductpicked_unique ON productpicked (measureid,pickupid,subproductid);

INSERT INTO products (name) VALUES ('Leche'); --1
INSERT INTO products (name) VALUES ('Pasta'); --2
INSERT INTO products (name) VALUES ('Legumbre'); --3
INSERT INTO products (name) VALUES ('Arroz'); --4
INSERT INTO products (name) VALUES ('Sopas'); --5
INSERT INTO products (name) VALUES ('Conservas'); --6
INSERT INTO products (name) VALUES ('Salsas'); --7
INSERT INTO products (name) VALUES ('Azúcar'); --8
INSERT INTO products (name) VALUES ('Harina'); --9
INSERT INTO products (name) VALUES ('Aceite'); --10
INSERT INTO products (name) VALUES ('Potitos'); --11
INSERT INTO products (name) VALUES ('Papillas'); --12
INSERT INTO products (name) VALUES ('Leche Infantil'); --13
INSERT INTO products (name) VALUES ('Pañales'); --14
INSERT INTO products (name) VALUES ('Toallitas'); --15 
INSERT INTO products (name) VALUES ('Galletas o Bollería'); --16
INSERT INTO products (name) VALUES ('Higiene'); --17

INSERT INTO subproducts (productid, name) VALUES (18,'Champú o Gel'); --1
INSERT INTO subproducts (productid, name) VALUES (18,'Compresas'); --2
INSERT INTO subproducts (productid, name) VALUES (18,'Tampones'); --3

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
INSERT INTO measures (type, weight) VALUES ('Talla 1', 0); -- 8
INSERT INTO measures (type, weight) VALUES ('Talla 2', 0); -- 9
INSERT INTO measures (type, weight) VALUES ('Talla 3', 0); -- 10
INSERT INTO measures (type, weight) VALUES ('Talla 4', 0); -- 11
INSERT INTO measures (type, weight) VALUES ('1 Paquete', 0); -- 12

INSERT INTO users (name, password, category) VALUES ('pau', 'testing', 'Admin');
INSERT INTO users (name, password, category) VALUES ('paloma', 'testing', 'Admin');
INSERT INTO users (name, password, category, cityid) VALUES ('bcn1', 'testing', 'User', 2);
INSERT INTO users (name, password, category, cityid) VALUES ('vcn1', 'testing', 'User', 3);

INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (2, 6, NULL); /* LECHE - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (3, 3, NULL); /* PASTA - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (3, 2, NULL); /* PASTA - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (4, 3, NULL); /* LEGUMBRE - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (4, 2, NULL); /* LEGUMBRE - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (17, 12, NULL); /* GALLETAS O BOLLERIA - 1 Paquete */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (5, 3, NULL); /* ARROZ - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (6, 6, NULL); /* SOPAS - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (7, 3, NULL); /* CONSERVAS - ? */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (8, 3, NULL); /* SALSAS - 250g */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (8, 3, NULL); /* SALSAS - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (9, 3, NULL); /* AZUCAR - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (10, 3, NULL); /* HARINA - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (11, 6, NULL); /* ACEITE - 1 litro */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (12, 3, NULL); /* POTITOS - ? */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (13, 3, NULL); /* PAPILLAS - ? */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (14, 3, NULL); /* LECHE INFANTIL - ? */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (15, 7, NULL); /* PAÑALES - Talla 0 */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (15, 8, NULL); /* PAÑALES - Talla 1 */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (15, 9, NULL); /* PAÑALES - Talla 2 */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (15, 10, NULL); /* PAÑALES - Talla 3 */
--INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (15, 11, NULL); /* PAÑALES - Talla 4 */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (16, 12, NULL); /* TOALLITAS - 1 Paquete */

INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 3, 1); /* CHAMPU - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 2); /* COMPRESAS - 1 Paquete */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 12, 3); /* TAMPONES - 1 Paquete */



/* FUNCTIONS */

SELECT SETVAL('productmeasures_id_seq', 1);