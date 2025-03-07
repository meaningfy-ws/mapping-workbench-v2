import { post } from '../app';

export const uploadMappingResource = async (values) => {
  const { id, ...others } = values
  return post('/api/post', { insert: { '@id': id, ...others } });
};

export const getMappingResource = async (id) => {
  return post('/api/get', {
    select:{
    "?s": ["*", { "rdf_files": ["*"] }]
  },
    where: {
      '@id': id,
      'rdf_files':'?s',
      '@type': 'projects',
    },
    depth:2
  });
};
