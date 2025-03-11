import api from '../app';
import { Project } from '../../models/project';

export const addProject = async (values: Project) => {
  return api.post('/api/post', { insert: { ...values, '@type': 'projects' } });
};

export const deleteProject = async (id: string) => {
  return api.delete('/api/delete', { id });
};

export const updateProject = async (values: Project) => {
  return api.put('/api/put', { ...values, '@type': 'projects' });
};

export const getProjects = async () => {
  return api.post('/api/get', {
    select: { '?s': ['@id', 'title', 'identifier', 'description', 'start_date', 'end_date'] },
    where: {
      '@id': '?s',
      '@type': 'projects',
    },
    // depth: 2,
  });
};
