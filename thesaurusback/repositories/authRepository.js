const pool = require('./dbConnection.js');

const queryString ={
  findByEmail: `SELECT "id_user", "name", "lastname", "role", "email", "password"
            FROM "user"
            WHERE "email" = $1`,
  insert: `INSERT INTO "user"("name", "lastname", "role", "email", "password")
            VALUES($1, $2, $3, $4, $5)
            RETURNING "id_user", "name", "lastname", "role", "email", "password"`,
  update: `UPDATE "user"
            SET "name" = $1, "lastname" = $2, "role" = $3, "email" = $4, "password" = $5
            WHERE "id_user" = $6
            RETURNING "id_user", "name", "lastname", "role", "email", "password"`,
  delete: `DELETE FROM "user"
            WHERE "id_user" = $1
            RETURNING "id_user", "name", "lastname", "role", "email", "password"`
}

const findByEmail = async (email) => {
  const query = await pool.query(
    queryString.findByEmail,
    [email]);
  if (query.rows.length < 1){
    return null
  }
  return query.rows[0];
}

const post = async (user) => {
  const query = await pool.query(
    queryString.insert,
    [user.name, user.lastname, user.role, user.email, user.password, ]);

  return query.rows;
}

const put = async (id_user, user) => {
  const query = await pool.query(
    queryString.update,
    [user.user_name, id_user]);
  if(query.rows.length < 1){
    return null;
  }
  return query.rows[0];
}


module.exports = { findByEmail, post }
