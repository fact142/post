const pool = require('./dbConnection.js');

const queryString ={
  selectAll: `SELECT "id_user", "name", "lastname", "role", "email", "password"
                FROM "user"
                ORDER BY "id_user"`,
  select: `SELECT "id_user", "name", "lastname", "role", "email", "password"
            FROM "user"
            WHERE "id_user" = $1`,
  insert: `INSERT INTO "user"("name", "lastname", "role", "email", "password")
            VALUES($1, $2, $3, $4, $5)
            RETURNING  "name", "lastname", "role", "email", "password"`,
  update: `UPDATE "user"
            SET "name" = $1, "lastname" = $2, "role" = $3, "email" = $4, "password" = $5
            WHERE "id_user" = $6
            RETURNING "id_user", "name", "lastname", "role", "email", "password"`,
  updateUser: `UPDATE "user"
            SET "name" = $1, "lastname" = $2, "email" = $3
            WHERE "id_user" = $4
            RETURNING "id_user", "name", "lastname", "email"`,
  delete: `DELETE FROM "User"
            WHERE "user" = $1
            RETURNING "user", "name", "lastname", "role", "email", "password"`
}

const getAll = async () => {
  const query = await pool.query(queryString.selectAll);
  return query.rows;
}

const get = async (id_user) => {
  const query = await pool.query(
    queryString.select,
    [id_user]);
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
    queryString.updateUser,
    [user.name, user.lastname, user.email, id_user]);
  if(query.rows.length < 1){
    return null;
  }
  return query.rows[0];
}

const remove = async (id_user) => {
  const query = await pool.query(
    queryString.delete,
    [id_user]);
  if(query.rows.length < 1){
    return null;
  }
  return query.rows[0];
}

module.exports = { getAll, get, post, put, remove }
