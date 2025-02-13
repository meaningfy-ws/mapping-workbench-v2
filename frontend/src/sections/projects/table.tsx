import PropTypes from 'prop-types';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Scrollbar } from 'src/components/scrollbar';

export const ProductListTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;


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
            {items.map(item => {
              console.log(item)
              return (
                <TableRow
                  hover
                  key={item['@id']}
                >
                  <TableCell>
                    {item.title}
                  </TableCell>
                  <TableCell>
                    {item.identifier}
                  </TableCell>
                  <TableCell>
                    {item.description}
                  </TableCell>
                  <TableCell>
                    {item.start_at}
                  </TableCell>
                  <TableCell>
                    {item.end_at}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <SvgIcon>
                        <DotsHorizontalIcon />
                      </SvgIcon>
                    </IconButton>
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
};
