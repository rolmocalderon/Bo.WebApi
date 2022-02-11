

/* CITIES */
CREATE TABLE cities(id SERIAL PRIMARY KEY, name VARCHAR(45) NOT NULL);
INSERT INTO cities VALUES (1,'Madrid'),(2,'Barcelona'),(3,'Bilbao'),(4,'Sevilla'),(5,'Valencia'),(6,'Toledo'),(7,'Albacete');

/* MEASURES */
CREATE TABLE measures(id SERIAL PRIMARY KEY, type VARCHAR(45) NOT NULL, alias VARCHAR(45) NOT NULL);
INSERT INTO measures VALUES (1,'Gramos','gramo'),(2,'Kilos','kilo'),(3,'Litros','litro'),(4,'Paquete','pack'),(5,'Paquete de 6','sixPack'),(6,'Paquete de 12','twelvePack');

/* PICKUPS */
CREATE TABLE pickups(id SERIAL PRIMARY KEY, date VARCHAR(45) NOT NULL, name VARCHAR(45) NOT NULL, cityId INT NOT NULL);
INSERT INTO pickups VALUES (1,'17/1/2022','Mercadona Nou Barris',2),(2,'16/1/2022','Spar Poble Sec',2),(3,'15/1/2022','Mercadona Nou Barris',2),(4,'15/1/2022','Spar Poble Sec',2),(5,'19/1/2022','Hortaleza',1),(6,'19/2/2022','mercat',5);

/* PRODUCTPICKED */
CREATE TABLE productpicked(
    id SERIAL PRIMARY KEY,
    amount INT NOT NULL, 
    observations VARCHAR(200), 
    weight VARCHAR(45) NOT NULL, 
    pickupId INT NOT NULL,
    productName VARCHAR(45) NOT NULL,
    measureId INT NOT NULL,
    productTypeId INT NOT NULL
);
INSERT INTO productpicked VALUES (1,12,NULL,'35',1,'Gasolina',2,1),(2,3,NULL,'200',1,'Compresas',2,2),(3,15,NULL,'100',2,'Aceite',2,3),(4,4,NULL,'1000',1,'Leche',2,2),(5,12,NULL,'500',5,'Spagueti',3,1),(6,25,NULL,'5',1,'Gasofa2',3,3),(7,12,NULL,'1',1,'Aceite',3,1),(8,100,NULL,'200',2,'qwert',1,2),(9,5,NULL,'3',2,'dherhr',2,3),(10,12,NULL,'100',1,'Peras',1,1);

/* PRODUCTS*/

CREATE TABLE products (
  id SERIAL PRIMARY KEY, 
  name varchar(45) NOT NULL,
  description varchar(200) DEFAULT NULL
);

INSERT INTO products VALUES (1,'Macarrones',NULL),(2,'Tomate',NULL),(3,'Compresas',NULL),(4,'Aceite',NULL);

/* PRODUCTTYPES */

CREATE TABLE producttypes (
  id SERIAL PRIMARY KEY,
  type varchar(45) NOT NULL,
  alias varchar(45) NOT NULL
);

INSERT INTO producttypes VALUES (1,'Comida','food'),(2,'Productos de higiene','hygieneProducts'),(3,'Productos de limpieza','cleaningProducts');

/* USERS */

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  category varchar(45) NOT NULL
);

INSERT INTO users VALUES (1,'pau','testing','regular'),(2,'paloma','testing','admin');

/* DELIVERIES */

CREATE TABLE deliveries(
  id SERIAL PRIMARY KEY,


CREATE TABLE deliveries(id SERIAL PRIMARY KEY, date VARCHAR(45) NOT NULL, name VARCHAR(45) NOT NULL, cityId INT NOT NULL);
INSERT INTO deliveries VALUES (1,'17/2/2022','Local Banco Obrero',2),(2,'19/2/2022','Local Banco Obrero',2),(3,'21/2/2022','Local Banco Obrero',2),(4,'15/2/2022','Casa del Pueblo',1),(5,'19/2/2022','Casa del Pueblo',1),(6,'19/2/2022','Local Banco Obrero',3);