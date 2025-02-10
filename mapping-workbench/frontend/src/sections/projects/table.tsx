import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Project from '../../models/project'

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

interface ProjectsTableProps {
    data: Project[]
}

const ProjectsTable = ({data}: ProjectsTableProps) => {
    console.log('dd', data)
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {TABLE_DATA.map(cell => <TableCell key={cell}>{cell}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, id) =>
                        <TableRow key={'row' + id}>
                            {TABLE_DATA.map(cell => <TableCell key={cell}>{row[cell]}</TableCell>)}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProjectsTable