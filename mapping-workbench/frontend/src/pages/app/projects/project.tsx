import {useEffect, useState} from "react";

import AddIcon from '@mui/icons-material/Add';

import {Button, Stack, Typography} from "@mui/material";

import Project from '../../../models/project'
import EditDrawer from "@/sections/projects/edit";
import ProjectsTable from "@/sections/projects/table";
import {addProjectApi, deleteProjectApi, getByTypeApi} from "@/pages/app/api";

interface ToggleDrawerShowProps {
    show?: boolean
}

interface ToggleDrawerProps extends Project, ToggleDrawerShowProps {
}

const ProjectPage = () => {
    const [toggleDrawer, setToggleDrawer] = useState<ToggleDrawerProps | ToggleDrawerShowProps>({show: false})
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => getByTypeApi('project')
        .then(res => setProjects(res))
        .catch(err => console.error(err))

    const onOpenAddDrawer = () => {
        setToggleDrawer({show: true})
    }

    const onOpenEditDrawer = (row: Project) => {
        setToggleDrawer({...row, show: true})
    }

    const onDelete = (id: string) => {
        return deleteProjectApi(id)
            .then(() => getData())
            .catch(err => console.error(err))
    }

    const onAdd = (values: ToggleDrawerProps) => {
        console.log('onAdd')
        addProjectApi(values)
            .then(() => {
                getData()
                setToggleDrawer({show: false})
            })
            .catch(err => console.error(err))
    }

    const onUpdate = (values: ToggleDrawerProps) => {
        const {['@id']: projectId, ...other} = values

        console.log('onUpdate')
        if (projectId)
            deleteProjectApi(projectId)
                .then(() => onAdd(other))
                .catch(err => console.error(err))
    }

    const {show, ...values} = toggleDrawer

    const existingValues = Object.keys(values).length > 0 ? values as ToggleDrawerProps : undefined

    return <Stack sx={{m: 3}}>
        <Typography variant='h4'>Project</Typography>
        <Stack direction='row' justifyContent='end' sx={{mb: 2}}>
            <Button startIcon={<AddIcon/>} onClick={onOpenAddDrawer}>Add</Button>
        </Stack>
        <ProjectsTable data={projects}
                       handleEdit={onOpenEditDrawer}
                       handleDelete={onDelete}/>
        <EditDrawer open={!!show}
                    values={existingValues}
                    handleEdit={onUpdate}
                    handleAdd={onAdd}
                    handleClose={() => setToggleDrawer({show: false})}/>
    </Stack>
}

export default ProjectPage