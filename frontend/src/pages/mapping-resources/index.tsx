import { useEffect, useState } from 'react';

import UploadIcon from '@mui/icons-material/Upload';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { Layout as AppLayout } from 'src/layouts';
import { usePageView } from 'src/hooks/use-page-view';
import useItemsSearch from 'src/hooks/use-items-search';
import { ItemList } from 'src/sections/app/file-manager/item-list';
import { ItemSearch } from 'src/sections/app/files-form/item-search';
import { FileUploader } from 'src/sections/app/file-manager/file-uploader';
import {
  deleteResource,
  getMappingResources,
  uploadMappingResource,
} from '../../api/mapping-resources';
import { sessionApi } from '../../api/session';
import { MappingResources } from '../../models/mapping-resources';

const Page = () => {
  const [view, setView] = useState('grid');
  const [state, setState] = useState({
    items: [],
    itemsCount: 0,
  });

  const uploadDialog = useDialog();
  const itemsSearch = useItemsSearch(state.items, ['title']);

  usePageView();

  useEffect(() => {
    handleItemsGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemsGet = async () => {
    const id = sessionApi.getSessionProject();
    getMappingResources(id)
      .then((res) => {
        console.log(res);
        setState({
          items: res,
          itemsCount: res.length,
        });
      })
      .catch((err) => console.error(err));
  };

  const handleUpload = async (files: MappingResources[]) => {
    uploadMappingResource({ id: sessionApi.getSessionProject(), files });
  };

  const handleDelete = async (id) => {
    deleteResource(id);
  };

  return (
    <>
      <Seo title="App: Resource Manager" />
      <Stack spacing={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <Stack spacing={1}>
            <Typography variant="h4">{`Mapping Resources`}</Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <Button
              onClick={uploadDialog.handleOpen}
              startIcon={<UploadIcon />}
            >
              Upload
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={{ xs: 3, lg: 4 }}>
          <ItemSearch
            onFiltersChange={(e) => itemsSearch.handleSearchItems([e])}
            onSortChange={itemsSearch.handleSortChange}
            onViewChange={setView}
            view={view}
          />
          <ItemList
            count={itemsSearch.count}
            items={itemsSearch.pagedItems}
            onPageChange={itemsSearch.handlePageChange}
            onRowsPerPageChange={itemsSearch.handleRowsPerPageChange}
            page={itemsSearch.state.page}
            rowsPerPage={itemsSearch.state.rowsPerPage}
            view={view}
            onGetItems={handleItemsGet}
            handleDelete={handleDelete}
          />
        </Stack>
      </Stack>

      <FileUploader
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
        onUpload={handleUpload}
        onGetItems={handleItemsGet}
      />
    </>
  );
};
Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
