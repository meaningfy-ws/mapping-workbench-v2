// import { deepCopy } from 'src/utils/deep-copy';

const query = {
  select: { '?s': ['*'] },
  where: {
    '@id': '?s',
    '@type': 'projects',
  },
};

const transact = {
  insert: {
    '@type': 'projects',
    title: 'title',
    identifier: 'identifier',
    description: 'description',
    start_date: new Date(),
    end_date: new Date(),
  },
};

export const addProject = async (values) => {
  const response = await fetch('/api/fluree/transact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ insert: { ...values, '@type': 'projects' } }, null, 2),
  });
  return await response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch('/api/fluree/transact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        delete: {"@id": id, '?p0': '?o0'},
        where: {"@id": id, '?p0': '?o0'},
    }, null, 2),
  });
  return await response.json();
};

export const getProjects = async () => {
  const response = await fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query, null, 2),
  });
  return await response.json();
};

const projectsApi = { getProjects };
export default projectsApi;
