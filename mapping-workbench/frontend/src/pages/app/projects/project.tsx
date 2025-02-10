import {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import EditDrawer from "@/sections/projects/edit";
import ProjectsTable from "@/sections/projects/table";
import {getByTypeApi} from "@/pages/app/api";


const Project = () => {
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getByTypeApi('project')
            .then(res => setProjects(res))
            .catch(err => console.error(err))
    }, [])

    return <Stack>
        <Stack direction='row' justifyContent='end' sx={{mb: 2}}>
            <Button onClick={() => setToggleDrawer(true)}>Add</Button>
            <Button onClick={() => setToggleDrawer(true)}>Edit</Button>
        </Stack>
        <ProjectsTable data={projects}/>
        <EditDrawer open={toggleDrawer} handleClose={() => setToggleDrawer(false)}/>
    </Stack>
}

export default Project