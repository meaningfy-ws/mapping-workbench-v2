// import { deepCopy } from 'src/utils/deep-copy';

export const addProject = async (values) => {
  const response = await fetch('http://localhost:8080/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values, null, 2),
  });
  return await response.json();
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
  console.log('updateProject ui', values)
  const response = await fetch('http://localhost:8080/api/projects', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values, null, 2),
  });
  return await response.json();
};

export const getProjects = async () => {
  const response = await fetch('http://localhost:8080/api/projects', {
    method: 'GET',
  });
  return await response.json();
};

const projectsApi = { getProjects };
export default projectsApi;
