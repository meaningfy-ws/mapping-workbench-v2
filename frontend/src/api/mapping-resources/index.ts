import { post } from '../app';

export const uploadMappingResource = async (values) => {
  const { id, ...others } = values;
  return post('/api/post', { insert: { '@id': id, ...others } });
};

export const deleteResource = async (id: string) => {
  return post('/api/post', {
    delete: { '@id': id, '?p0': '?o0' },
    where: { '@id': id, '?p0': '?o0' },
  });
};

export const getMappingResources = async (id: string) => {
  return post('/api/get', {
    select: {
      '?s': ['*', { rdf_files: ['*'] }],
    },
    where: {
      '@id': id,
      rdf_files: '?s',
      '@type': 'projects',
    },
    depth: 2,
  });
};


export const getMappingResource = async (id: string) => {
  return post('/api/get', {
    select: {
      '?s': ['*', { rdf_files: ['*'] }],
    },
    where: {
      '@id': id,
      rdf_files: '?s',
      '@type': 'projects',
    },
    depth: 2,
  });
};
