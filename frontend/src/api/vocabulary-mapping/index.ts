import api from '../app';
import { MappingResources } from '../../models/mapping-resources';

export const uploadMappingResource = async ({
  id,
  files,
}: {
  id: string;
  files: MappingResources[];
}) => {
  return api.post('/api/post', { insert: { '@id': id, rdf_files: files } });
};

export const deleteResource = async (id: string) => {
  return api.post('/api/post', {
    where: {
      '@id': '?s',
      rdf_files: {
        '@id': id,
        '?p': '?o',
      },
    },
    delete: {
      '@id': '?s',
      rdf_files: {
        '@id': id,
        '?p': '?o',
      },
    },
  });
};

export const updateMappingResource = async (values: MappingResources) => {
  return api.put('/api/put', { ...values });
};

export const getMappingResources = async (id: string) => {
  return api.post('/api/get', {
    select: {
      '?s': ['@id', 'format', 'title'],
    },
    where: {
      '@id': id,
      rdf_files: '?s',
      '@type': 'projects',
    },
  });
};

export const getMappingResource = async (id: string) => {
  return api.post('/api/get', {
    select: { [id]: ['*'] },
  });
};
