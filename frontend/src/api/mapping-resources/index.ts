import api from '../app';
import { MappingResources } from '../../models/mapping-resources';

export const uploadMappingResource = async ({
  id,
  files,
}: {
  id: string;
  files: MappingResources[];
}) => {
  return api.post('/api/post', { insert: { '@id': id, ...files } });
};

export const deleteResource = async (id: string) => {
  return api.delete('/api/delete', { id });
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
    depth: 2,
  });
};

export const getMappingResource = async (id: string) => {
  return api.post('/api/get', {
    select: {
      '?s': [
        {
          rdf_files: ['title', 'format', 'content'],
        },
      ],
    },
    where: {
      '@id': '?s',
      rdf_files: {
        '@id': '_:fdb-1741686777829-Xi5k9pK-',
      },
    },
  });
};
