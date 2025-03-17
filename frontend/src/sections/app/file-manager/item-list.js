import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useState } from 'react';

import { Scrollbar } from 'src/components/scrollbar';
import ConfirmDialog from '../../../components/dialog/confirm-dialog';
import { ItemListCard } from './item-list-card';
import { ItemListRow } from './item-list-row';
import TablePagination from 'src/components/table-pagination-pages';

export const ItemList = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    view = 'grid',
    onGetItems = () => {},
    handleDelete = () => {},
  } = props;

  const [confirmOpen, setConfirmOpen] = useState(false);

  const onDelete = () => {
    handleDelete(confirmOpen);
    setConfirmOpen(false);
  };

  const content =
    view === 'grid' ? (
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {items.map((item) => (
            <ItemListCard
              key={item?.['@id']}
              item={item}
              onGetItems={onGetItems}
              handleDelete={() => setConfirmOpen(item['@id'])}
            />
          ))}
        </Box>
      </Box>
    ) : (
      // Negative margin is a fix for the box shadow. The virtual scrollbar cuts it.
      <Box sx={{ m: -3 }}>
        <Scrollbar>
          <Box sx={{ p: 3 }}>
            <Table
              sx={{
                minWidth: 600,
                borderCollapse: 'separate',
                borderSpacing: '0 8px',
              }}
            >
              <TableBody>
                {items.map((item) => (
                  <ItemListRow
                    key={item['@id']}
                    item={item}
                    onGetItems={onGetItems}
                    onDelete={() => setConfirmOpen(item['@id'])}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
      </Box>
    );

  return (
    <Card>
      <Stack spacing={4}>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, { value: -1, label: 'All' }]}
          showFirstButton
          showLastButton
        >
          {content}
        </TablePagination>
        <ConfirmDialog
          title="Delete It?"
          open={!!confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={onDelete}
          // footer={confirmDialogFooter}
        >
          <>Are you sure you want to delete it?</>
          {/*<>{confirmDialogContent}</>*/}
        </ConfirmDialog>
      </Stack>
    </Card>
  );
};

ItemList.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  view: PropTypes.oneOf(['grid', 'list']),
  onGetItems: PropTypes.func,
  handleDelete: PropTypes.func,
};
