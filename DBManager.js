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
                    name varchar(20)
                )
                
                CREATE TABLE IF NOT EXISTS booking (
                    id int PRIMARY KEY AUTO_INCREMENT,
                    idType int NOT NULL,
                    date DATE NOT NULL,
                    hour INT NOT NULL,
                    name VARCHAR(50),
                    FOREIGN KEY (idType) REFERENCES type(id) 
                )
                `);      
        },
        selectAll: () => {
            const sql = `
                SELECT b.id, t.name type, b.date, b.hour, b.name
                FROM booking AS b
                JOIN type as t ON b.idType = t.id
            `;
            return executeQuery(sql); 
        },
        insert: (booking) => {
            const template = `
                INSERT INTO booking (idType, date, hour, name) VALUES ('%IDTYPE', '%DATE', '%HOUR', '%NAME')
            `;
            let sql = template.replace("%IDTYPE", booking.idType)
                                .replace("%DATE", booking.date)
                                .replace("%HOUR", booking.hour)
                                .replace("%NAME", booking.name);
            return executeQuery(sql);
        },
        selectSpecific: (date) => {
            let sql = `
                SELECT b.id, t.name type, b.date, b.hour, b.name
                FROM booking AS b
                JOIN type as t ON b.idType = t.id
                WHERE date='%DATE'
            `;
            sql = sql.replace("%DATE", date);
            return executeQuery(sql); 
        }
    }
}

module.exports = DBManager;