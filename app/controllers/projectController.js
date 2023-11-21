const projectMapper = require('../dataMappers/projectMapper');
const projectUserMapper = require('../dataMappers/projectUserMapper');

const projectController = {
  async getAllProjects(_, res) {
    const projects = await projectMapper.findAllProjects();
    res.json({ status: 'success', data: projects });
  },

  // cette méthode récupère l'id dans les paramètres de la requête
  async getOneProject(req, res) {
    const projectId = req.params.id;
    const project = await projectMapper.findOneProject(projectId);
    res.json({ status: 'success', data: project });
  },

  async deleteOneProject(req, res) {
    const projectId = req.params.id;
    const project = await projectMapper.removeOneProject(projectId);
    res.json({ status: 'success', data: project });
  },

  // cette méthode récupère les données dans le body de la requête, hors users
  async addOneProject(req, res) {
    const {
      title, description, availability, user_id, tags,
    } = req.body;
    const project = await projectMapper.createOneProject(title, description, availability, user_id, tags);
    res.json({ status: 'success', data: project });
  },

  async editOneProject(req, res) {
    const projectId = req.params.id;
    const {
      title, description, availability, tags,
    } = req.body;
    const project = await projectMapper.updateOneProject(projectId, {
      title, description, availability, tags,
    });
    res.json({ status: 'success', data: project });
  },

  // ces méthodes récupèrent les id des projets et users dans les paramètres de la requête
  async addUserToProject(req, res) {
    const { projectId, userId } = req.params;
    const projectHasUser = await projectUserMapper.createProjectHasUser(projectId, userId);
    res.json({ status: 'success', data: projectHasUser });
  },

  async updateUserToProject(req, res) {
    const { projectId, userId } = req.params;
    const projectHasUser = await projectUserMapper.updateProjectHasUser(projectId, userId);
    res.json({ status: 'success', data: projectHasUser });
  },

  async deleteUserToProject(req, res) {
    const { projectId, userId } = req.params;
    const projectHasUser = await projectUserMapper.deleteProjectHasUser(projectId, userId);
    res.json({ status: 'success', data: projectHasUser });
  },
  async checkTitle(req, res) {
    const { oldTitle } = req.body;
    const projects = await projectMapper.findAllProjects();
    const foundProject = projects.find((project) => project.title === oldTitle);
    if (foundProject) {
      return res.json({ message: 'Le titre du projet n\'est pas disponible', status: 'error' });
    }
    return res.json({ message: 'Le titre du projet est disponible', status: 'success' });
  },
};

module.exports = projectController;
