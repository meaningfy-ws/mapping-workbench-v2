import {useEffect, useState} from "react";
import Project from "@/models/project";
import {Button, Drawer, Stack, TextField, Typography} from "@mui/material";
import {addProjectApi, deleteProjectApi} from "@/pages/app/api";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


interface ProjectDrawerProps extends Project {
    '@id': string;
}

interface EditDrawerProps {
    open: boolean;
    values: ProjectDrawerProps;

    handleClose(open: boolean): void;
}

const EditDrawer = ({open, values, handleClose}: EditDrawerProps) => {
    const initialValues = {
        '@id': '',
        title: '',
        identifier: '',
        description: '',
        start_date: new Date(),
        end_date: new Date(),
        '@type': ''
    }

    const [defaultValues, setDefaultValues] = useState<ProjectDrawerProps>(initialValues)

    useEffect(() => {
        if (open)
            setDefaultValues(values ?? initialValues)
    }, [open])

    const {['@id']: projectId, ...projectValues} = defaultValues

    const handleAdd = () => addProjectApi(projectValues)

    const handleUpdate = () => {
        deleteProjectApi(projectId)
            .then(handleAdd)

    }

    const handleChange = (input: string, value: string) => {
        setDefaultValues(prevState => ({...prevState, [input]: value}))
    }

    return (
        <Drawer open={open} onClose={handleClose} anchor='right'>
            <Stack sx={{p: 2, pt: 2}} gap={2}>
                <Typography variant='h5'>{values['@id'] ? 'Edit Project' : 'Add project'}</Typography>
                <TextField value={defaultValues.title} placeholder={'title'}
                           onChange={e => handleChange('title', e.target.value)}/>
                <TextField value={defaultValues.identifier} placeholder={'identifier'}
                           onChange={e => handleChange('identifier', e.target.value)}/>
                <TextField value={defaultValues.description} placeholder={'description'}
                           onChange={e => handleChange('description', e.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={e => handleChange('start_date', e?.toString() ?? "")}
                                value={dayjs(defaultValues.start_date)}
                    />
                    <DatePicker onChange={e => handleChange('end_date', e?.toString() ?? '')}
                                value={dayjs(defaultValues.end_date)}
                    />
                </LocalizationProvider>
            </Stack>
            <Button onClick={values['@id'] ? handleUpdate : handleAdd}>{values['@id'] ? 'Edit' : 'Add'}</Button>
        </Drawer>
    )
}

export default EditDrawer