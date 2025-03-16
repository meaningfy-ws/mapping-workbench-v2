import { ReactElement, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
import { addProject, deleteProject, getProjects, updateProject } from '../../api/projects';
import EditDrawer from '../../sections/projects/edit';
import { Project } from '../../models/project';

const useProjectsSearch = () => {
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

const useProjectsStore = (searchState) => {
  const [state, setState] = useState({
    projects: [],
    projectsCount: 0,
  });

  const handleProjectsGet = useCallback(async () => {
    getProjects()
      .then((res) =>
        setState({
          projects: res,
          projectsCount: res.length,
        })
      )
      .catch((err) => console.error(err));
  }, [searchState]);

  useEffect(
    () => {
      handleProjectsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    handleProjectsGet,
    ...state,
  };
};

const Page = () => {
  const projectsSearch = useProjectsSearch();
  const projectsStore = useProjectsStore(projectsSearch.state);
  const [menuAnchor, setMenuAnchor] = useState<[EventTarget, string] | null>(null);

  usePageView();

  const [editOpen, setEditOpen] = useState(false);
  const [editValues, setEditValues] = useState<Project | undefined>();

  const handleEditOpen = (values?: Project) => {
    setEditOpen(true);
    setEditValues(values);
  };

  const onAdd = (values: Project) => {
    addProject(values)
      .then(() => {
        projectsStore.handleProjectsGet();
        setEditOpen(false);
        setEditValues(undefined);
        toast.success('Project Created');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
  };

  const onDelete = (id: string) => {
    deleteProject(id)
      .then(() => {
        projectsStore.handleProjectsGet();
        toast.success('Project Deleted');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
  };

  const onEdit = (values: Project) => {
    // deleteProject(values['@id']).then(() =>
    //   addProject(values).then(() => {
    //     projectsStore.handleprojectsGet();
    updateProject(values)
      .then(() => {
        projectsStore.handleProjectsGet();
        setEditOpen(false);
        setEditValues(undefined);
        toast.success('Project Updated');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
  };

  return (
    <>
      <Seo title="Projects List" />
      <Box
        component="main"
        sx={{ flexGrow: 1, py: 8 }}
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
                <Button
                  id='add_button'
                  onClick={() => handleEditOpen()}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              {/*<ProductListSearch onFiltersChange={projectsSearch.handleFiltersChange} />*/}
              <ProjectListTable
                onPageChange={projectsSearch.handlePageChange}
                onRowsPerPageChange={projectsSearch.handleRowsPerPageChange}
                page={projectsSearch.state.page}
                items={projectsStore.projects}
                count={projectsStore.projectsCount}
                rowsPerPage={projectsSearch.state.rowsPerPage}
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
Page.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default Page;
