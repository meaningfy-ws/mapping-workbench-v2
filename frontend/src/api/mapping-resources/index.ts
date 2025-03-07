import { post } from '../app';
import { Project } from '../../models/project';

export const uploadMappingResource = async (values) => {
  const { id, ...others } = values
  return post('/api/post', { insert: { '@id': id, ...others } });
};

export const getMappingResource = async (id) => {
  return post('/api/get', {
    select:  ['rdf_files'] ,
    where: {
      '@id': id,
      // '@type': 'projects',
    },
  });
};
