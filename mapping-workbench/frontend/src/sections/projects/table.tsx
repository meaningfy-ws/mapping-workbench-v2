import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Project from '../../models/project'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

interface ProjectsTableProps {
    data: Project[],
    handleEdit: (row: Project) => void;
    handleDelete: (id?: string) => Promise<number>;
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
                        {TABLE_DATA.map(cell => <TableCell key={cell}>
                            <Typography variant='h5'>
                                {cell}
                            </Typography>
                        </TableCell>)}
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row =>
                        <TableRow key={row['@id']}>
                            {TABLE_DATA.map(cell => <TableCell key={cell}>{row[cell]}</TableCell>)}
                            <TableCell><IconButton onClick={() => handleEdit(row)}><EditIcon/></IconButton>
                                <IconButton
                                    onClick={() => setConfirmDialogOpen({open: true, id: row['@id'] ?? ""})}><DeleteIcon/>
                                </IconButton>
                                {/*handleDelete(row['@id'])*/}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={confirmDialogOpen.open}
                    onClose={handleConfirmClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>Disagree</Button>
                    <Button onClick={() => onConfirmDelete(confirmDialogOpen.id)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    )
}

export default ProjectsTable