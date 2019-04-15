const { Pool } = require('pg');

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'ecommercedatas',
  password: 'password',
  port: 5432,
});

const getUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};

const getUserById = async idToFind => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE id = ${idToFind}`
  );
  return rows[0];
};

const getProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM products');
  return rows;
};

const getAdressByUserId = async userIdToFind => {
  const { rows } = await pool.query(
    `SELECT * FROM address WHERE userId = ${userIdToFind}`
  );
  return rows[0];
};

const getOrders = async () => {
  const { rows } = await pool.query('SELECT * FROM orders ORDER BY id DESC');
  return rows;
};

const getOrdersByUserId = async userIdToFind => {
  const { rows } = await pool.query(
    `SELECT * FROM orders WHERE userId = ${userIdToFind}`
  );
  return rows;
};

const addUser = async (name, password) => {
  const { rows } = await pool.query(
    `INSERT INTO users (name, password) VALUES ('${name}', '${password}') RETURNING *`
  );
  return rows[0];
};

const deleteUser = async idToDelete => {
  const { rows } = await pool.query(
    `DELETE FROM users WHERE id = ${idToDelete} RETURNING *`
  );
  return rows[0];
};

const addOrder = async (date, totalht, userid) => {
  const { rows } = await pool.query(
    `INSERT INTO orders (date, totalHT, userId) VALUES ('${date}', '${totalht}', ${userid}) RETURNING *`
  );
  return rows[0];
};

const addOrderAndOrdersProducts = async (date, totalht, userid, productsId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const insertOrder = `INSERT INTO orders (date, totalHT, userId) VALUES ('${date}', '${totalht}', ${userid}) RETURNING *`;
    const { rows: insertOrderRows } = await client.query(insertOrder);

    const productsMapped = productsId
      .map(productId => `(${insertOrderRows[0].id}, ${productId})`)
      .join(', ');
    const insertOrderProduct = `INSERT INTO orders_products (orderId, productId) VALUES ${productsMapped} RETURNING *`;
    const { rows: insertOrderProductsRows } = await client.query(
      insertOrderProduct
    );
    await client.query('COMMIT');

    return insertOrderRows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
  } finally {
    client.release();
  }
};

const addUserAndUserAddress = async (name, password, num, street, town) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const inserUser = `INSERT INTO users (name, password) VALUES ('${name}', '${password}') RETURNING *`;
    const { rows: insertUserRows } = await client.query(inserUser);
    const { id: userId } = insertUserRows[0];
    const inserUserAddress = `INSERT INTO address (num, street, town, userId) VALUES ('${num}', '${street}', '${town}', ${userId}) RETURNING *`;
    const { rows } = await client.query(inserUserAddress);
    await client.query('COMMIT');
    return insertUserRows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
  } finally {
    client.release();
  }
};

const getOrderedProducts = async orderIdToFind => {
  const { rows } = await pool.query(
    `SELECT * 
    FROM orders_products
    INNER JOIN products ON orders_products.productId = products.id 
    WHERE orders_products.orderId = ${orderIdToFind}
    `
  );
  return rows;
};

module.exports = {
  getUsers,
  getProducts,
  getUserById,
  getAdressByUserId,
  getOrders,
  getOrdersByUserId,
  addUser,
  deleteUser,
  addOrder,
  addOrderAndOrdersProducts,
  getOrderedProducts,
  addUserAndUserAddress,
};
