import {
    Alert,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import Project from '../../models/project'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

interface ProjectsTableProps {
    data: Project[],
    handleEdit: (row: Project) => void;
    handleDelete: (id: string) => Promise<void>;
}

const ProjectsTable = ({data, handleEdit, handleDelete}: ProjectsTableProps) => {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState({open: false, id: ""})
    const handleConfirmClose = () => setConfirmDialogOpen({open: false, id: ""})
    const onConfirmDelete = (id: string) => {
        handleDelete(id)
            .then(() => handleConfirmClose())
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant='h5'>
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='h5'>
                                Identifier
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='h5'>
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='h5'>
                                Start Date
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='h5'>
                                End Date
                            </Typography>
                        </TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row =>
                        <TableRow key={row['@id']} hover>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.identifier}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.start_date?.toString()}</TableCell>
                            <TableCell>{row.end_date?.toString()}</TableCell>
                            <TableCell><IconButton onClick={() => handleEdit(row)}><EditIcon/></IconButton>
                                <IconButton
                                    onClick={() => setConfirmDialogOpen({
                                        open: true,
                                        id: row['@id'] ?? ""
                                    })}><DeleteIcon/>
                                </IconButton>
                                {/*handleDelete(row['@id'])*/}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/*<TablePagination    rowsPerPageOptions={[5, 10, 25]} count={data.length} onPageChange={handlePageChange} page={page} rowsPerPage={rowsPerPage}/>*/}
            <Dialog open={confirmDialogOpen.open}
                    onClose={handleConfirmClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete it ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="warning">Are you sure you want to delete it?</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>Cancel</Button>
                    <Button variant='contained' color='error' onClick={() => onConfirmDelete(confirmDialogOpen.id)}
                            autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    )
}

export default ProjectsTable