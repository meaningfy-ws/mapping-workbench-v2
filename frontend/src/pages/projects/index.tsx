import { useCallback, useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as AppLayout } from 'src/layouts';
import { ProjectListTable } from 'src/sections/projects/table';
import { addProject, deleteProject, getProjects } from '../../api/projects';
import EditDrawer from '../../sections/projects/edit';
import { Project } from '../../models/project';

const useProductsSearch = () => {
  const [state, setState] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

const useProductsStore = (searchState) => {
  const [state, setState] = useState({
    products: [],
    productsCount: 0,
  });

  const handleProductsGet = useCallback(async () => {
    getProjects()
      .then((res) =>
        setState({
          products: res,
          productsCount: res.length,
        })
      )
      .catch((err) => console.error(err));
  }, [searchState]);

  useEffect(
    () => {
      handleProductsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    handleProductsGet,
    ...state,
  };
};

const Page = () => {
  const productsSearch = useProductsSearch();
  const productsStore = useProductsStore(productsSearch.state);
  const [menuAnchor, setMenuAnchor] = useState<EventTarget | null>(null);

  usePageView();

  const [editOpen, setEditOpen] = useState(false);
  const [editValues, setEditValues] = useState(undefined);

  console.log(editValues);

  const handleEditOpen = (values?: Project) => {
    setEditOpen(true);
    setEditValues(values);
  };

  const onAdd = (values: Project) => {
    addProject(values).then(() => {
      productsStore.handleProductsGet();
      setEditOpen(false);
    });
  };

  const onDelete = (id) => {
    deleteProject(id).then(() => {
      productsStore.handleProductsGet();
    });
  };

  const onEdit = () => {};

  return (
    <>
      <Seo title="Projects List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Projects</Typography>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button onClick={productsStore.handleProductsGet}>request</Button>
                <Button
                  onClick={() => handleEditOpen()}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              {/*<ProductListSearch onFiltersChange={productsSearch.handleFiltersChange} />*/}
              <ProjectListTable
                onPageChange={productsSearch.handlePageChange}
                onRowsPerPageChange={productsSearch.handleRowsPerPageChange}
                page={productsSearch.state.page}
                items={productsStore.products}
                count={productsStore.productsCount}
                rowsPerPage={productsSearch.state.rowsPerPage}
                menuAnchor={menuAnchor}
                setMenuAnchor={setMenuAnchor}
                handleEditOpen={handleEditOpen}
                handleDelete={onDelete}
              />
            </Card>
          </Stack>
        </Container>
        <EditDrawer
          handleAdd={onAdd}
          handleEdit={onEdit}
          open={editOpen}
          values={editValues}
          handleClose={() => setEditOpen(false)}
        />
      </Box>
    </>
  );
};
Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
