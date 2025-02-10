import {
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

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

interface ProjectsTableProps {
    data: Project[],
    handleEdit: (row: Project) => void;
    handleDelete: (id: string, type: string) => void;
}

const ProjectsTable = ({data, handleEdit, handleDelete}: ProjectsTableProps) => {
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
                                    onClick={() => handleDelete(row['@id'], 'project')}><DeleteIcon/></IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProjectsTable