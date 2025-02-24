import { post } from '../app/index';

export const addProject = async (values) => {
  return post('/api/post', { insert: { ...values, '@type': 'projects' } });
};

export const deleteProject = async (id) => {
  return post('/api/post', {
    delete: { '@id': id, '?p0': '?o0' },
    where: { '@id': id, '?p0': '?o0' },
  });
};

export const updateProject = async (values) => {
  const { '@id': id, ...other } = values;
  return deleteProject(id).then((res) => addProject(other));
};

export const getProjects = async () => {
  return post('/api/get', {
    select: { '?s': ['*'] },
    where: {
      '@id': '?s',
      '@type': 'projects',
    },
  });
};

const projectsApi = { getProjects };
export default projectsApi;
