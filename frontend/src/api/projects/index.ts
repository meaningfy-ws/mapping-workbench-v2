import { post } from '../app';
import {Project} from "../../models/project";

export const addProject = async (values: Project) => {
  return post('/api/post', { insert: { ...values, '@type': 'projects' } });
};

export const deleteProject = async (id:string) => {
  return post('/api/post', {
    delete: { '@id': id, '?p0': '?o0' },
    where: { '@id': id, '?p0': '?o0' },
  });
};

export const updateProject = async (values:Project) => {
  // const { '@id': id, ...other } = values;
  // return deleteProject(id).then((res) => addProject(other));
  addProject(values)
};

export const getProjects = async () => {
  return post('/api/get', {
    select: { '?s': ['*'] },
    where: {
      '@id': '?s',
      '@type': 'projects',
    },
    depth:2
  });
};
