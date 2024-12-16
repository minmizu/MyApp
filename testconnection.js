const mysql = require('mysql2/promise');
require('dotenv').config();

const API_URL = process.env.apiUrl;
console.log('La URL de la API es:', API_URL);


async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log('VAMO CHILE CONECTO!');
    await connection.close();
  } catch (error) {
    console.error('NO CONECTO CREO QUE EL PROBLEMA ES DEL HASWER:', error);
  }
}

testConnection();
