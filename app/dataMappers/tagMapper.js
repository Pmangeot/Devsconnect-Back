const client = require('./database');
const ApiError = require('../errors/apiError.js');

const findAllTags = async () => {
  const preparedQuery = 'SELECT * FROM "tag"';
  const results = await client.query(preparedQuery);
  if (!results.rows) {
    throw new ApiError('Tags not found', { statusCode: 204 });
  }
  return results.rows;
};

const findOneTag = async (id) => {
  const preparedQuery = {
    text: 'SELECT * FROM "tag" WHERE "id" = $1',
    values: [id],
  };
  const results = await client.query(preparedQuery);
  if (!results.rows[0]) {
    throw new ApiError('Tag not found', { statusCode: 204 });
  }
  return results.rows[0];
};

module.exports = {
  findAllTags,
  findOneTag,
};
