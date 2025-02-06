import {Button,  Stack} from "@mui/material";
import ProjectsTable from "@/sections/projects/table";
import EditDrawer from "@/sections/projects/edit";
import {useState} from "react";

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

const Project = () => {
    const [toggleDrawer,setToggleDrawer] = useState(false)

    return <Stack>
        <Stack direction='row' justifyContent='end' sx={{mb:2}}>
            <Button>Add</Button>
            <Button onClick={() => setToggleDrawer(true)}>Edit</Button>
        </Stack>
        <ProjectsTable/>
        <EditDrawer open={toggleDrawer} handleClose={() => setToggleDrawer(false)}/>
    </Stack>
}

export default Project