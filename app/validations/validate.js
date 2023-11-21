function validate(schema, dataSource) {
  return (request, response, next) => {
    const { error } = schema.validate(request[dataSource]);
    if (error) {
      return response.status(400).json({ status: 'error', errors: error.details.map((err) => err.message) });
    }
    return next();
  };
}

module.exports = validate;
