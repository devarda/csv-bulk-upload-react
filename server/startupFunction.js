async function startup() {
  const connection = await require("./mysqlConnection")();
  const database_name = process.env.MYSQL_DATABASE;

  // Create database if not exists
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database_name}`);
  console.log("Database created");

  await connection.changeUser({ database: database_name });

  // Create table if not exists
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS purchase_orders (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        model_number VARCHAR(255), 
        unit_price FLOAT, 
        quantity INT, 
        created_date TIMESTAMP default CURRENT_TIMESTAMP
      )`;

  await connection.query(createTableQuery);
  console.log("Table created");
}

module.exports = startup;
