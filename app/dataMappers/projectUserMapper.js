const client = require('./database');
const ApiError = require('../errors/apiError.js');

const createProjectHasUser = async (projectId, userId) => {
  const preparedQuery = {
    text: `
    INSERT INTO "project_has_user" ("project_id", "user_id", "is_active")
    SELECT $1, $2, CASE WHEN "project"."user_id" = $2 THEN TRUE ELSE FALSE END
    FROM "project"
    WHERE "project"."id" = $1
    RETURNING *`,
    values: [projectId, userId],
  };
  const results = await client.query(preparedQuery);
  if (!results.rows[0]) {
    throw new ApiError('Relation not found', { statusCode: 204 });
  }
  return results.rows[0];
};

const updateProjectHasUser = async (projectId, userId) => {
  const result = await client.query(`UPDATE "project_has_user" 
    SET "is_active" = NOT"is_active"
    WHERE "project_has_user"."project_id" = ${projectId} 
    AND "project_has_user"."user_id" = ${userId} 
    RETURNING *`);
  if (!result.rows[0]) {
    throw new ApiError('Relation not found', { statusCode: 204 });
  }
  return result.rows[0];
};

const deleteProjectHasUser = async (projectId, userId) => {
  const preparedQuery = {
    text: 'DELETE FROM "project_has_user" WHERE "project_id" = $1 AND "user_id" = $2 RETURNING *',
    values: [projectId, userId],
  };
  const result = await client.query(preparedQuery);
  if (!result.rows[0]) {
    throw new ApiError('Relation not found', { statusCode: 204 });
  }
  return result.rows[0];
};

module.exports = {
  createProjectHasUser,
  updateProjectHasUser,
  deleteProjectHasUser,
};
