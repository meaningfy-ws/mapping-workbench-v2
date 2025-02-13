import { useState, MouseEvent } from 'react';

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

export const ProductListTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    handleEditOpen = () => {},
    handleDelete = () => {}
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleActionsClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditor = (item) => {
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
            {items.map((item) => {
              console.log(item);
              return (
                <TableRow
                  hover
                  key={item['@id']}
                >
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.identifier}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.start_at}</TableCell>
                  <TableCell>{item.end_at}</TableCell>
                  <TableCell align="right">
                    <MenuActions>
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
                      onConfirm={() =>handleDelete(item['@id'])}
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

ProductListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleEditOpen: PropTypes.func,
  handleDelete: PropTypes.func
};
