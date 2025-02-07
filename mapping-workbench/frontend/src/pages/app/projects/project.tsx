import {Button,  Stack} from "@mui/material";
import ProjectsTable from "@/sections/projects/table";
import EditDrawer from "@/sections/projects/edit";
import {useEffect, useState} from "react";
import {getByTypeApi} from "@/api";


const Project = () => {
    const [toggleDrawer,setToggleDrawer] = useState(false)

    useEffect(() => {
        getByTypeApi('projects')
            .then(res => console.log(res))
            .catch(err=> console.error(err))
    })

    return <Stack>
        <Stack direction='row' justifyContent='end' sx={{mb:2}}>
            <Button onClick={() => setToggleDrawer(true)}>Add</Button>
            <Button onClick={() => setToggleDrawer(true)}>Edit</Button>
        </Stack>
        <ProjectsTable/>
        <EditDrawer open={toggleDrawer} handleClose={() => setToggleDrawer(false)}/>
    </Stack>
}

export default Project