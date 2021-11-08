const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  insertRankings: () => {
    let con = mysql.createConnection({
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
    });
    const select = `select u.nickname,l.users_id, count(l.id) as likes
    from users u
    join likes l
    on u.id = l.users_id
    group by l.id
    order by likes desc
    limit 10`;
    const insert = `insert into rankings(id,nickname,users_id,likes,createdAt,updatedAt) values ?`;
    con.connect(function (err) {
      if (err) throw err;
      con.query(select, function (err, result, fields) {
        if (err) throw err;
        data = result.map((el) => {
          return [
            "null",
            el.nickname,
            el.users_id,
            el.likes,
            new Date(),
            new Date(),
          ];
        });
        con.query(insert, [data], function (err, insert_r, fields) {
          if (err) throw err;
          console.log(insert_r);
          con.end();
          return;
        });
      });
    });
  },
};
