import { get, post } from '../app/index';

export const addProject = async (values) => {
  return post('http://localhost:8080/api/projects', values);
};

export const deleteProject = async (id) => {
  const response = await fetch('http://localhost:8080/api/projects', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }, null, 2),
  });
  return await response.json();
};

export const updateProject = async (values) => {
  console.log('updateProject ui', values);
  const response = await fetch('http://localhost:8080/api/projects', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values, null, 2),
  });
  return await response.json();
};

export const getProjects = async () => {
  return get('/api/projects', null);
};

const projectsApi = { getProjects };
export default projectsApi;
