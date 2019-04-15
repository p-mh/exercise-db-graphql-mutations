const { Pool } = require('pg');

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'ecommercedatas',
  password: 'password',
  port: 5432,
});

const dropTables = async () => {
  const result = await pool.query(
    'DROP TABLE users, address, products, orders, orders_products'
  );
  console.log(result);
};

const tables = [
  'CREATE TABLE users (id BIGSERIAL, name TEXT, password TEXT)',
  'CREATE TABLE address (id BIGSERIAL, num INTEGER, street TEXT, town TEXT, postalCode INTEGER, userId BIGINT)',
  'CREATE TABLE products (id BIGSERIAL, title TEXT, description TEXT, price INTEGER, image TEXT)',
  'CREATE TABLE orders (id BIGSERIAL, date DATE, totalHT INTEGER, userId BIGINT)',
  'CREATE TABLE orders_products (orderId BIGINT, productId BIGINT)',
];

const createTables = async () => {
  const result = await Promise.all(tables.map(table => pool.query(table)));
  console.log(result);
};

const values = [
  `INSERT INTO users (name, password) VALUES ('Toto', 'azerty'), ('Tutu', '0000'), ('Titi', '1234')`,
  `INSERT INTO address (num, street, town, postalCode, userId) VALUES (45, 'rue du Javelot', 'Paris', 75000, 1), (23, 'rue de Paris', 'Paris', 75000, 2), (12, 'rue Saint Pierre', 'Paris', 75000, 3)`,
  `INSERT INTO products (title, description, price) VALUES ('Pomme', 'pomme rouge', 0.5), ('Banane', 'banane jaune', 1.5)`,
  `INSERT INTO orders (date, totalHT, userId) VALUES ('2001-10-05', 45, 1), ('2018-12-21', 33, 2)`,
  `INSERT INTO orders_products (orderId, productId) VALUES (1, 1), (2, 1)`,
];

const insertValues = async () => {
  const result = await Promise.all(
    values.map(valueQuery => pool.query(valueQuery))
  );
  console.log(result);
};

const initDb = async () => {
  await dropTables();
  await createTables();
  await insertValues();
  pool.end();
};

initDb();
