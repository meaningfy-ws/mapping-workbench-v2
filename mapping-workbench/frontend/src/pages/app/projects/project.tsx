import {useEffect, useState} from "react";
import {Button, Stack, Typography} from "@mui/material";
import EditDrawer from "@/sections/projects/edit";
import ProjectsTable from "@/sections/projects/table";
import {deleteProjectApi, getByTypeApi} from "@/pages/app/api";
import Project from '../../../models/project'

interface ToggleDrawerShowProps {
    show?: boolean
}

interface ToggleDrawerProps extends Project, ToggleDrawerShowProps {
}

const ProjectPage = () => {
    const [toggleDrawer, setToggleDrawer] = useState<ToggleDrawerProps | ToggleDrawerShowProps>({show: false})
    const [projects, setProjects] = useState([])

    console.log(toggleDrawer)

    useEffect(() => {
        getByTypeApi('project')
            .then(res => setProjects(res))
            .catch(err => console.error(err))
    }, [])

    const handleAdd = () => {
        setToggleDrawer({show: true})
    }

    const onEdit = (row: Project) => {
        setToggleDrawer({...row, show: true})
    }

    const onDelete = (id: string) => {
        deleteProjectApi(id)
    }

    const {show, ...values} = toggleDrawer

    return <Stack sx={{m: 3}}>
        <Typography variant='h4'>Project</Typography>
        <Stack direction='row' justifyContent='end' sx={{mb: 2}}>
            <Button onClick={handleAdd}>Add</Button>
        </Stack>
        <ProjectsTable data={projects}
                       handleEdit={onEdit}
                       handleDelete={onDelete}/>
        <EditDrawer open={!!show}
                    values={values} handleClose={() => setToggleDrawer({show: false})}/>
    </Stack>
}

export default ProjectPage