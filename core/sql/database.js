const mysql = require('mysql')
const { database } = require('./keys')
const { promisify } = require('util')

const pool = mysql.createPool(database)
pool.getConnection((err, connection) => {
    if (err) console.log(err.code)
    if (connection) connection.release()
    return;
})

let getColumnsByTable = table => pool.query(table)
function getForeingKeysByTable(table) {
    return pool.query(`
    SELECT 
        COLUMN_NAME,  
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
    FROM information_schema.key_column_usage
    WHERE referenced_table_name IS NOT NULL
        AND TABLE_NAME = ?`, [table])
}

// LOGIN
pool.signin = (username, password) => pool.query('SELECT * FROM name_table_users username LIKE ? AND passwoed LIKE password', [username, password])[0]

// CUSTOM QUERY
pool.query = promisify(pool.query)

// CRUD
pool.getAll = table => pool.query(`SELECT * FROM ${table}`)
pool.getById = (table, id) => pool.query(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [id])[0]
pool.create = (table, parameters) => pool.query(`INSERT INTO ${table} SET ?`, [parameters])
pool.updateById = (table, parameters, id) => pool.query(`UPDATE ${table} SET ? WHERE id = ?`, [parameters, id])
pool.delete = (table, id) => pool.query(`DELETE FROM ${table} WHERE id = ?`, [id])

module.exports = pool