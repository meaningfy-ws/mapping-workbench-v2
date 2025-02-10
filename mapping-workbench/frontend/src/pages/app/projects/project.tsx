import {useEffect, useState} from "react";
import {Button, Stack, Typography} from "@mui/material";
import EditDrawer from "@/sections/projects/edit";
import ProjectsTable from "@/sections/projects/table";
import {addProjectApi, deleteProjectApi, getByTypeApi} from "@/pages/app/api";
import Project from '../../../models/project'

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
    }

    const onAdd = (values) =>
        addProjectApi(values)
            .then(() => {
                getData()
                setToggleDrawer({show: false})
            })

    const onUpdate = (values) => {
        const {['@id']: projectId, ...other} = values

        deleteProjectApi(projectId)
            .then(() =>
                onAdd(other)
                    .then(() => getData())
            )
    }

    const {show, ...values} = toggleDrawer

    return <Stack sx={{m: 3}}>
        <Typography variant='h4'>Project</Typography>
        <Stack direction='row' justifyContent='end' sx={{mb: 2}}>
            <Button onClick={onOpenAddDrawer}>Add</Button>
            <Button onClick={getData}>Refresh</Button>
        </Stack>
        <ProjectsTable data={projects}
                       handleEdit={onOpenEditDrawer}
                       handleDelete={onDelete}/>
        <EditDrawer open={!!show}
                    values={values}
                    handleEdit={onUpdate}
                    handleAdd={onAdd}
                    handleClose={() => setToggleDrawer({show: false})}/>
    </Stack>
}

export default ProjectPage