import { post } from '../app';
import {Project} from "../../models/project";

export const addMappingResource = async (values: Project) => {
  return post('/api/post', { insert: { ...values, '@type': 'projects' } });
};

export const deleteMappingResource = async (id:string) => {
  return post('/api/post', {
    delete: { '@id': id, '?p0': '?o0' },
    where: { '@id': id, '?p0': '?o0' },
  });
};

export const updateMappingResource = async (values:Project) => {
  const { '@id': id, ...other } = values;
  return deleteMappingResource(id).then((res) => addMappingResource(other));
};

export const getMappingResource = async () => {
  return post('/api/get', {
    select: { '?s': ['*'] },
    where: {
      '@id': '?s',
      '@type': 'projects',
    },
  });
};
