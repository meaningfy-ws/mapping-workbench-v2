import {useState, MouseEvent, ChangeEvent} from 'react';

import PropTypes from 'prop-types';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';

import { Scrollbar } from 'src/components/scrollbar';
import { MenuActionButton, MenuActions } from '../../components/menu-actions';
import ConfirmDialog from '../../components/dialog/confirm-dialog';
import { Project } from '../../models/project';

interface ProjectListTableProps {
  count: number;
  items: Project[];
  onPageChange: (e: MouseEvent| null, page: number) => void;
  onRowsPerPageChange: (e: ChangeEvent) => void;
  page: number;
  rowsPerPage: number;
  menuAnchor: EventTarget | null;
  setMenuAnchor: (e:  EventTarget | null) => void;
  handleEditOpen: (item: Project) => void;
  handleDelete: (id: string) => void;
}

export const ProjectListTable = (props: ProjectListTableProps) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    menuAnchor = null,
    setMenuAnchor = () => {},
    handleEditOpen = () => {},
    handleDelete = () => {},
  } = props;

  const [confirmOpen, setConfirmOpen] = useState(false);



  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleOpenEditor = (item: Project) => {
    handleClose();
    handleEditOpen(item);
  };

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell> Title </TableCell>
              <TableCell> Identifier </TableCell>
              <TableCell> Description </TableCell>
              <TableCell> Start Date </TableCell>
              <TableCell> End Date </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: Project) => {
              return (
                <TableRow
                  hover
                  key={item['@id']}
                >
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.identifier}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.start_date.toString()}</TableCell>
                  <TableCell>{item.end_date.toString()}</TableCell>
                  <TableCell align="right">
                    <MenuActions
                      anchor={menuAnchor}
                      setAnchor={setMenuAnchor}
                    >
                      <MenuActionButton
                        id="view_last_state_button"
                        onClick={() => handleOpenEditor(item)}
                        title="Edit"
                        icon={<BorderColorIcon />}
                      />

                      <MenuActionButton
                        id="delete_button"
                        onClick={() => setConfirmOpen(true)}
                        icon={<DeleteOutlineIcon />}
                        title="Delete"
                      />
                    </MenuActions>
                    <ConfirmDialog
                      title="Delete It?"
                      open={confirmOpen}
                      setOpen={setConfirmOpen}
                      onConfirm={() => handleDelete(item['@id'])}
                      // footer={confirmDialogFooter}
                    >
                      <>Are you sure you want to delete it?</>
                      {/*<>{confirmDialogContent}</>*/}
                    </ConfirmDialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
};

// ProjectListTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   page: PropTypes.number,
//   menuAnchor: PropTypes.object,
//   setMenuAnchor: PropTypes.func,
//   rowsPerPage: PropTypes.number,
//   handleEditOpen: PropTypes.func,
//   handleDelete: PropTypes.func,
// };
