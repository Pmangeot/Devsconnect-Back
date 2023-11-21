const client = require('./database');
const ApiError = require('../errors/apiError.js');

const createProjectHasTag = async (projectId, tagId) => {
  const preparedQuery = {
    text: 'INSERT INTO "project_has_tag" ("project_id", "tag_id") VALUES ($1, $2) RETURNING *',
    values: [projectId, tagId],
  };
  const results = await client.query(preparedQuery);
  if (!results.rows[0]) {
    throw new ApiError('Relation not found', { statusCode: 204 });
  }
  return results.rows[0];
};

const deleteProjectHasTag = async (projectId, tagId) => {
  const preparedQuery = {
    text: 'DELETE FROM "project_has_tag" WHERE "project_id" = $1 AND "tag_id" = $2 RETURNING *',
    values: [projectId, tagId],
  };
  const result = await client.query(preparedQuery);
  if (!result.rows[0]) {
    throw new ApiError('Relation not found', { statusCode: 204 });
  }
  return result.rows[0];
};

module.exports = {
  createProjectHasTag,
  deleteProjectHasTag,
};
