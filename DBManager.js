const mysql = require('mysql2');

function DBManager(conf) {
    const conn = mysql.createConnection(conf);

    const executeQuery = (sql) => {
        return new Promise((resolve, reject) => {      
              conn.query(sql, function (err, result) {
                 if (err) {
                    console.error(err);
                    reject();     
                 }   
                 resolve(result);         
           });
        })
    }

    return {
        createTable: () => {
            return executeQuery(`
                CREATE TABLE IF NOT EXISTS type (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(20)
                );
            `).then(() => {
                return executeQuery(`
                    CREATE TABLE IF NOT EXISTS booking (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        idType INT NOT NULL,
                        date DATE NOT NULL,
                        hour INT NOT NULL,
                        name VARCHAR(50),
                        FOREIGN KEY (idType) REFERENCES type(id)
                    );
                `);
            });
        },
        insert: (booking) => {
            const template = `
                INSERT INTO booking (idType, date, hour, name) VALUES (%IDTYPE, '%DATE', %HOUR, '%NAME')
            `;
            let sql = template.replace("%IDTYPE", booking.idType)
                                .replace("%DATE", booking.date)
                                .replace("%HOUR", booking.hour)
                                .replace("%NAME", booking.name);
            return executeQuery(sql);
        },
        selectAll: () => {
            let sql = `
                SELECT b.id, t.name type, b.date, b.hour, b.name
                FROM booking AS b
                JOIN type as t ON b.idType = t.id
            `;
            return executeQuery(sql); 
        },
        selectIdType: (type) => {
            let sql = `
                SELECT * FROM type WHERE name = '%TYPE';
            `;
            sql = sql.replace("%TYPE", type);
            return executeQuery(sql); 
        },
    }
}

module.exports = DBManager;