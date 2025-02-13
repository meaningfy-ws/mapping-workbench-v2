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

export const addProjects = async () => {
  const response = await fetch('/api/fluree/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transact, null, 2),
  });
  return await response.json();
};

export const getProjects = async () => {
  const response = await fetch('/api/fluree/get', {
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
