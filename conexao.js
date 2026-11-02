require('dotenv').config();

const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '180171',
    database: 'crud_clinica',
    port: 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = conexao;
