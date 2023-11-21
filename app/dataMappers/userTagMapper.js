const client = require('./database');
const ApiError = require('../errors/apiError.js');

const createUserHasTag = async (userId, tagId) => {
  const preparedQuery = {
    text: 'INSERT INTO "user_has_tag" ("user_id", "tag_id") VALUES ($1, $2) RETURNING *',
    values: [userId, tagId],
  };
  const results = await client.query(preparedQuery);
  return results.rows[0];
};

const deleteUserHasTag = async (userId, tagId) => {
  const preparedQuery = {
    text: 'DELETE FROM "user_has_tag" WHERE "user_id" = $1 AND "tag_id" = $2 RETURNING *',
    values: [userId, tagId],
  };
  const result = await client.query(preparedQuery);
  if (!result.rows[0]) {
    throw new ApiError('Relation not found', { statusCode: 204 });
  }
  return result.rows[0];
};

module.exports = {
  createUserHasTag,
  deleteUserHasTag,
};
