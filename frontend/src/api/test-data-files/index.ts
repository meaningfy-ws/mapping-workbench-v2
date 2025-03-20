import api from '../app';
import { VocabularyMapping } from '../../models/vocabulary-mapping';

export const uploadMappingResource = async ({
  id,
  files,
}: {
  id: string;
  files: VocabularyMapping[];
}) => {
  return api.post('/api/post', { insert: { '@id': id, test_data_files: files } });
};

export const deleteResource = async (id: string) => {
  return api.post('/api/post', {
    where: {
      '@id': '?s',
      test_data_files: {
        '@id': id,
        '?p': '?o',
      },
    },
    delete: {
      '@id': '?s',
      test_data_files: {
        '@id': id,
        '?p': '?o',
      },
    },
  });
};

export const updateMappingResource = async (values: VocabularyMapping) => {
  return api.put('/api/put', { ...values });
};

export const getMappingResources = async (id: string) => {
  return api.post('/api/get', {
    select: {
      '?s': ['@id', 'format', 'title'],
    },
    where: {
      '@id': id,
      test_data_files: '?s',
      '@type': 'projects',
    },
  });
};

export const getMappingResource = async (id: string) => {
  return api.post('/api/get', {
    select: { [id]: ['*'] },
  });
};
