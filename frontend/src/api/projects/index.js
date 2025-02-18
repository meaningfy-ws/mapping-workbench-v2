import { deletE, get, post, update } from '../app/index';

export const addProject = async (values) => {
  return post('/api/projects', values);
};

export const deleteProject = async (id) => {
  return deletE('/api/projects', { id });
};

export const updateProject = async (values) => {
  return update('/api/projects', values);
};

export const getProjects = async () => {
  return get('/api/projects', null);
};

const projectsApi = { getProjects };
export default projectsApi;
