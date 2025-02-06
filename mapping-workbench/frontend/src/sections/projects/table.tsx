import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

const ProjectsTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {TABLE_DATA.map(cell => <TableCell key={cell}>{cell}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {TABLE_DATA.map(cell => <TableCell key={cell}>{cell}</TableCell>)}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProjectsTable