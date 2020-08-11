var SQL = SQL || {}

SQL.getColumnsByTable = 'SHOW COLUMNS FROM ?'
SQL.getForeingKeysByTable = `
    SELECT 
        COLUMN_NAME,  
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
    FROM information_schema.key_column_usage
    WHERE referenced_table_name IS NOT NULL
        AND TABLE_NAME = ?`

module.exports = SQL