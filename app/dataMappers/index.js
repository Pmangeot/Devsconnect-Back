const projectMapper = require('./projectMapper');
const userMapper = require('./userMapper');
const tagMapper = require('./tagMapper');
const projectUserMapper = require('./projectUserMapper'); 
const projectTagMapper = require('./projectTagMapper'); 
const userTagMapper = require('./userTagMapper');

// Exportez les fonctions regroupées par type
module.exports = {
  projects: projectMapper,
  users: userMapper,
  tags: tagMapper,
  projectUsers: projectUserMapper,
  projectTags: projectTagMapper,
  userTags: userTagMapper
};
