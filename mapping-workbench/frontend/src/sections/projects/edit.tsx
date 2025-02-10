import {useEffect, useState} from "react";
import dayjs from "dayjs";
import Project from "@/models/project";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Button, Drawer, Stack, TextField, Typography} from "@mui/material";


interface ProjectDrawerProps extends Project {
    '@id': string;
}

interface EditDrawerProps {
    open: boolean;
    values: ProjectDrawerProps;

    handleAdd(values:ProjectDrawerProps): void;

    handleEdit(values:ProjectDrawerProps): void;

    handleClose(open: boolean): void;
}

const EditDrawer = ({open, values, handleAdd, handleEdit, handleClose}: EditDrawerProps) => {
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
            <Button onClick={() =>values['@id'] ? handleEdit(defaultValues) : handleAdd(defaultValues)}>{values['@id'] ? 'Edit' : 'Add'}</Button>
        </Drawer>
    )
}

export default EditDrawer