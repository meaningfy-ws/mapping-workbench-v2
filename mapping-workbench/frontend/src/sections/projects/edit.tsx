import dayjs from "dayjs";
import * as Yup from "yup";

import Project from "@/models/project";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Button, Drawer, Stack, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import {useEffect, useState} from "react";


interface EditDrawerProps {
    open: boolean;
    values?: Project;

    handleAdd(values: Project): void;

    handleEdit(values: Project): void;

    handleClose(open: boolean): void;
}

const EditDrawer = ({open, values, handleAdd, handleEdit, handleClose}: EditDrawerProps) => {
    const defaultValues = {
            title: '',
            identifier: '',
            description: '',
            start_date: new Date(),
            end_date: new Date(),
            '@type': 'project'
        }
    const [initialValues, setInitialValues] = useState<Project>(defaultValues)

    useEffect(() => {
        setInitialValues(values ?? defaultValues)
    }, [values])


    const isEdit = !!values?.['@id']

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            "title": Yup
                .string()
                .max(255)
                .required('Title is required'),
            "identifier": Yup
                .string()
                .max(255)
                .required('Identifier is required'),
        }),
        onSubmit: formikValues => {
            if (isEdit)
                handleEdit(formikValues)
            else handleAdd(formikValues)
        },
        enableReinitialize: true
    });


    return (
        <Drawer open={open} onClose={handleClose} anchor='right'>
            <form onSubmit={formik.handleSubmit}>

                <Stack sx={{p: 2, pt: 2}} gap={2}>
                    <Typography variant='h5'>{isEdit ? 'Edit Project' : 'Add project'}</Typography>
                    <TextField id='title' name='title' value={formik.values.title} label='Title'
                               error={!!(formik.touched.title && formik.errors.title)}
                               onChange={formik.handleChange}/>
                    <TextField id='identifier' name='identifier' value={formik.values.identifier} label='Identifier'
                               onChange={formik.handleChange}/>
                    <TextField id='description' name='description' value={formik.values.description} label='Description'
                               onChange={formik.handleChange}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={e => formik.setFieldValue('start_date', e?.toString() ?? "")}
                                    name='start_date' label='Start Date'
                                    value={dayjs(formik.values.start_date)}
                        />
                        <DatePicker onChange={e => formik.setFieldValue('end_date', e?.toString() ?? '')}
                                    name='end_date' label='End Date'
                                    value={dayjs(formik.values.end_date)}
                        />
                    </LocalizationProvider>
                    <Button type='submit'>{isEdit ? 'Edit' : 'Add'}</Button>
                </Stack>
            </form>
        </Drawer>
    )
}

export default EditDrawer