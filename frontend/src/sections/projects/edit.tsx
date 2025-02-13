import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Drawer, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Project } from 'src/models/project';


interface EditDrawerProps {
  open: boolean;
  values: Project;

  handleAdd(values:Project):void;
  handleEdit(values:Project):void;
  handleClose(open: boolean): void;
}

const EditDrawer = ({ open, values, handleAdd, handleEdit, handleClose }: EditDrawerProps) => {
  console.log(values);

  const initialValues = {
    title: '',
    identifier: '',
    description: '',
    start_date: new Date(),
    end_date: new Date(),
  };

  const [defaultValues, setDefaultValues] = useState<Project>(initialValues);

  useEffect(() => {
    if (open) setDefaultValues(values ?? initialValues);
  }, [open]);

  const { ['@id']: projectId, ...projectValues } = defaultValues;

  // const handleAdd = (values) => {
  //   handleAdd
  // };

  const handleUpdate = (values) => {
    // deleteProjectApi(projectId)
    //     .then(handleAdd)
  };

  const handleChange = (input: string, value: string) => {
    setDefaultValues((prevState) => ({ ...prevState, [input]: value }));
  };

  const idEdit = values?.['@id'];

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
    >
      <Stack
        sx={{ p: 2, pt: 2 }}
        gap={2}
      >
        <Typography variant="h5">{idEdit ? 'Edit Project' : 'Add project'}</Typography>
        <TextField
          value={defaultValues.title}
          placeholder="title"
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <TextField
          value={defaultValues.identifier}
          placeholder="identifier"
          onChange={(e) => handleChange('identifier', e.target.value)}
        />
        <TextField
          value={defaultValues.description}
          placeholder="description"
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(e) => handleChange('start_date', e?.toString() ?? '')}
            value={dayjs(defaultValues.start_date)}
          />
          <DatePicker
            onChange={(e) => handleChange('end_date', e?.toString() ?? '')}
            value={dayjs(defaultValues.end_date)}
          />
        </LocalizationProvider>
      </Stack>
      <Button onClick={() =>idEdit ? handleUpdate(defaultValues) : handleAdd(defaultValues)}>{idEdit ? 'Edit' : 'Add'}</Button>
    </Drawer>
  );
};

export default EditDrawer;
