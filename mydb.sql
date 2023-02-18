DROP TABLE IF EXISTS products, subproducts, productmeasures, productpicked, users, cities, measures, pickups, subproducts, productmeasures, productpicked, urgentproducts, families, familymembers;

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
   weight DECIMAL NOT NULL
);

CREATE TABLE users (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   category VARCHAR(50) NOT NULL,
   cityid INT REFERENCES cities (id) ON DELETE CASCADE
);

CREATE TABLE pickups (
   id serial PRIMARY KEY,
   date VARCHAR(50) NOT NULL,
   name VARCHAR(50) NOT NULL,
   cityid INT REFERENCES cities (id) ON DELETE CASCADE
);

CREATE TABLE subproducts (
   id serial PRIMARY KEY,
   productid INT REFERENCES products (id) ON DELETE CASCADE,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE productmeasures (
   id serial PRIMARY KEY,
   productid INT,
   measureid INT NOT NULL REFERENCES measures (id) ON DELETE CASCADE,
   subproductid INT REFERENCES subproducts (id) ON DELETE CASCADE
);

CREATE TABLE productpicked (
   id serial PRIMARY KEY,
   amount INT NOT NULL,
   pickupid INT REFERENCES pickups (id) ON DELETE CASCADE,
   productid INT REFERENCES products (id) ON DELETE CASCADE,
   measureid INT NOT NULL REFERENCES measures (id) ON DELETE CASCADE,
   subproductid INT
);

CREATE TABLE urgentproducts (
   id serial PRIMARY KEY,
   productid INT NOT NULL REFERENCES products (id) ON DELETE CASCADE,
   cityid INT NOT NULL REFERENCES cities (id) ON DELETE CASCADE
);

CREATE TABLE families(
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   cityid INT NOT NULL REFERENCES cities (id) ON DELETE CASCADE
);

CREATE TABLE familymembers(
   id serial PRIMARY KEY,
   familyid INT NOT NULL REFERENCES families (id) ON DELETE CASCADE,
   name VARCHAR(50),
   gender VARCHAR(50),
   datebirth VARCHAR(50)
);

CREATE UNIQUE INDEX productmeasures_unique ON productmeasures (measureid,productid);
CREATE UNIQUE INDEX subproductmeasures_unique ON productmeasures (measureid,subproductid);
CREATE UNIQUE INDEX productpicked_unique ON productpicked (measureid,pickupid,productid);
CREATE UNIQUE INDEX subproductpicked_unique ON productpicked (measureid,pickupid,subproductid);

INSERT INTO cities (id, name) VALUES (1, 'Madrid');
INSERT INTO cities (id, name) VALUES (2, 'Barcelona');
INSERT INTO cities (id, name) VALUES (3, 'Valencia');
INSERT INTO cities (id, name) VALUES (4, 'Sevilla');
INSERT INTO cities (id, name) VALUES (5, 'Bilbao');

INSERT INTO products (id, name) VALUES (1, 'Pan');
INSERT INTO products (id, name) VALUES (2, 'Desayuno');
INSERT INTO products (id, name) VALUES (3, 'Café');
INSERT INTO products (id, name) VALUES (4, 'Chocolate');
INSERT INTO products (id, name) VALUES (5, 'Leche');
INSERT INTO products (id, name) VALUES (6, 'Harina');
INSERT INTO products (id, name) VALUES (7, 'Arroz');
INSERT INTO products (id, name) VALUES (8, 'Pasta');
INSERT INTO products (id, name) VALUES (9, 'Legumbres');
INSERT INTO products (id, name) VALUES (10, 'Sopas');
INSERT INTO products (id, name) VALUES (11, 'Salsas');
INSERT INTO products (id, name) VALUES (12, 'Aceite');
INSERT INTO products (id, name) VALUES (13, 'Azúcar');
INSERT INTO products (id, name) VALUES (14, 'Conservas');
INSERT INTO products (id, name) VALUES (15, 'Alimentos Infantiles');
INSERT INTO products (id, name) VALUES (16, 'Fruta Fresca');
INSERT INTO products (id, name) VALUES (17, 'Verdura Fresca');
INSERT INTO products (id, name) VALUES (18, 'Embutidos y Carne Fresca');
INSERT INTO products (id, name) VALUES (19, 'Higiene');
INSERT INTO products (id, name) VALUES (20, 'Limpieza');
INSERT INTO products (id, name) VALUES (21, 'Higiene Femenina');
INSERT INTO products (id, name) VALUES (22, 'Pañales');
INSERT INTO products (id, name) VALUES (23, 'Huevos (6)');

INSERT INTO subproducts (id, productid, name) VALUES (1, 2,'Galletas');
INSERT INTO subproducts (id, productid, name) VALUES (2, 2,'Bollería');
INSERT INTO subproducts (id, productid, name) VALUES (3, 2,'Cereales');
INSERT INTO subproducts (id, productid, name) VALUES (4, 4,'Colacao');
INSERT INTO subproducts (id, productid, name) VALUES (5, 4,'Tableta');
INSERT INTO subproducts (id, productid, name) VALUES (6, 14,'Fruta');
INSERT INTO subproducts (id, productid, name) VALUES (7, 14,'Vegetales');
INSERT INTO subproducts (id, productid, name) VALUES (8, 14,'Pescado');
INSERT INTO subproducts (id, productid, name) VALUES (9, 14,'Legumbres');
INSERT INTO subproducts (id, productid, name) VALUES (10, 14,'Platos Preparados');
INSERT INTO subproducts (id, productid, name) VALUES (11, 15,'Potitos');
INSERT INTO subproducts (id, productid, name) VALUES (12, 15,'Papillas');
INSERT INTO subproducts (id, productid, name) VALUES (13, 15,'Leche en Polvo');
INSERT INTO subproducts (id, productid, name) VALUES (14, 19,'Gel');
INSERT INTO subproducts (id, productid, name) VALUES (15, 19,'Champú');
INSERT INTO subproducts (id, productid, name) VALUES (16, 19,'Toallitas');
INSERT INTO subproducts (id, productid, name) VALUES (17, 21,'Compresas');
INSERT INTO subproducts (id, productid, name) VALUES (18, 21,'Tampones');
INSERT INTO subproducts (id, productid, name) VALUES (19, 22,'Talla 0');
INSERT INTO subproducts (id, productid, name) VALUES (20, 22,'Talla 1');
INSERT INTO subproducts (id, productid, name) VALUES (21, 22,'Talla 2');
INSERT INTO subproducts (id, productid, name) VALUES (22, 22,'Talla 3');
INSERT INTO subproducts (id, productid, name) VALUES (23, 22,'Talla 4');
INSERT INTO subproducts (id, productid, name) VALUES (24, 22,'Talla 5');
INSERT INTO subproducts (id, productid, name) VALUES (25, 22,'Talla 6');

INSERT INTO measures (id, type, weight) VALUES (1, '80g', 0.08);
INSERT INTO measures (id, type, weight) VALUES (2, '125g', 0.12);
INSERT INTO measures (id, type, weight) VALUES (3, '250g', 0.25);
INSERT INTO measures (id, type, weight) VALUES (4, '360g', 0.36);
INSERT INTO measures (id, type, weight) VALUES (5, '400g', 0.4);
INSERT INTO measures (id, type, weight) VALUES (6, '435g', 0.43);
INSERT INTO measures (id, type, weight) VALUES (7, '480g', 0.48);
INSERT INTO measures (id, type, weight) VALUES (8, '500g', 0.5);
INSERT INTO measures (id, type, weight) VALUES (9, '520g', 0.52);
INSERT INTO measures (id, type, weight) VALUES (10, '600g', 0.6);
INSERT INTO measures (id, type, weight) VALUES (11, '800g', 0.8);
INSERT INTO measures (id, type, weight) VALUES (12, '1Kg', 1);
INSERT INTO measures (id, type, weight) VALUES (13, '250ml', 0.25);
INSERT INTO measures (id, type, weight) VALUES (14, '320ml', 0.32);
INSERT INTO measures (id, type, weight) VALUES (15, '400ml', 0.4);
INSERT INTO measures (id, type, weight) VALUES (16, '500ml', 0.5);
INSERT INTO measures (id, type, weight) VALUES (17, '650ml', 0.65);
INSERT INTO measures (id, type, weight) VALUES (18, '1L', 1);
INSERT INTO measures (id, type, weight) VALUES (19, '1.5L', 1.5);
INSERT INTO measures (id, type, weight) VALUES (20, '235g', 0.23);

INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (1, 5, NULL); /* Pan - 400g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (3, 3, NULL); /* Café - 250g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (3, 5, NULL); /* Salsas - 500ml */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (5, 18, NULL); /* Leche - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (5, 19, NULL); /* Leche - 1.5 litros */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (6, 12, NULL); /* Harina - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (7, 12, NULL); /* Arroz - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (8, 8, NULL); /* Pasta - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (8, 12, NULL); /* Pasta - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (9, 12, NULL); /* Legumbres - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (10, 18, NULL); /* Sopas - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (11, 14, NULL); /* Salsas - 320ml */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (12, 18, NULL); /* Aceite - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (13, 12, NULL); /* Azúcar - 1 kilo */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (15, 6, NULL); /* Huevos - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (16, 8, NULL); /* Fruta Fresca - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (17, 8, NULL); /* Verdura Fresca - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (18, 8, NULL); /* Embutidos y carne fresca - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (20, 18, NULL); /* Limpieza - 1 litro */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (23, 4, NULL); /* Huevos - 360g */

INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 11, 1); /* Galletas - 800g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 2); /* Bollería - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 3); /* Cereales - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 5, 4); /* Colacao - 400g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 2, 5); /* Tableta - 125g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 11, 6); /* Fruta - 800g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 5, 7); /* Vegetales - 400g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 1, 8); /* Pescado - 80g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 9, 9); /* Legumbres - 520g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 6, 10); /* Platos preparados - 435g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 20, 11); /* Potitos - 235g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 10, 12); /* Papilla - 600g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 11, 13); /* Leche en polvo - 800g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 17, 14); /* Gel - 650ml */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 15, 15); /* Champú - 400ml */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 7, 16); /* Toallitas - 480gr */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 5, 17); /* Compresas - 400g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 5, 18); /* Tampones - 400g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 19); /* Talla 0 - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 20); /* Talla 1 - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 21); /* Talla 2 - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 22); /* Talla 3 - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 23); /* Talla 4 - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 24); /* Talla 5 - 500g */
INSERT INTO productmeasures (productid, measureid, subproductid) VALUES (NULL, 8, 25); /* Talla 6 - 500g */


INSERT INTO users (name, password, category) VALUES ('pau', 'testing', 'Admin');
INSERT INTO users (name, password, category) VALUES ('paloma', 'testing', 'Admin');
INSERT INTO users (name, password, category, cityid) VALUES ('bcn1', 'testing', 'User', 2);
INSERT INTO users (name, password, category, cityid) VALUES ('vcn1', 'testing', 'User', 3);

INSERT INTO families (id, name, cityid) VALUES (1, 'Lopez', 2);
INSERT INTO families (id, name, cityid) VALUES (2, 'Martinez', 2);

INSERT INTO familymembers (id, familyid, name, gender, datebirth) VALUES (1, 1, NULL, 'men', '09/06/1987');
INSERT INTO familymembers (id, familyid, name, gender, datebirth) VALUES (2, 1, NULL, 'women', '15/05/1984');
INSERT INTO familymembers (id, familyid, name, gender, datebirth) VALUES (3, 1, NULL, 'women', '17/08/2022');

INSERT INTO familymembers (id, familyid, name, gender, datebirth) VALUES (4, 2, NULL, 'women', '15/05/1984');
INSERT INTO familymembers (id, familyid, name, gender, datebirth) VALUES (5, 2, NULL, 'women', '17/08/2022');


/* FUNCTIONS */

SELECT SETVAL('products_id_seq', 23);
SELECT SETVAL('subproducts_id_seq', 25);
SELECT SETVAL('cities_id_seq', 5);
SELECT SETVAL('measures_id_seq', 20);

SELECT nextval('products_id_seq');

/* RELOAD DATA */

DROP TABLE products, subproducts, productmeasures, productpicked;