const pool = require('./dbConnection.js');

const queryString ={
  select: `SELECT "title", "text", "name", "lastname"
            FROM "user"
            INNER JOIN post
            ON "user".id_user = post.author
            WHERE post.id_post = $1`,
  findByAuthor: `SELECT "title", "text", "name", "lastname"
            FROM "user"
            INNER JOIN post
            ON "user".id_user = post.author
            WHERE post.author = $1`,
  getAll: `SELECT "title", "text", "name", "lastname"
            FROM "user"
            INNER JOIN post
            ON "user".id_user = post.author`,
  insert: `INSERT INTO "post"("title", "text", "author")
           VALUES($1, $2, $3)
           RETURNING "title"`,
  remove: `DELETE FROM post
           WHERE id_post = $1`

}
const getOne = async (id) => {
  const query = await pool.query(
    queryString.select,
    [id]
  )
  return query.rows[0];
}
const getPostsByUser = async (id) => {
  const query = await pool.query(
    queryString.findByAuthor,
    [id]);
  if (query.rows.length < 1){
    return null
  }
  return query.rows;
}
const getAll = async  () => {
  const query = await pool.query(
    queryString.getAll
  )
  return query.rows;
}
const createPost = async (title, text, id) => {
  const query = await pool.query(
    queryString.insert,
    [title, text, id]
  )
  if (query.rows.length < 1){
    return null
  }
  return query.rows;
}
const deletePost = async (id) => {
  await pool.query(
    queryString.remove,
    [id]
  )
}
module.exports = { getPostsByUser, getAll, createPost, deletePost, getOne }
