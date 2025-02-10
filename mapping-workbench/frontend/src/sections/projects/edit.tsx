import {useState} from "react";
import Project from "@/models/project";
import {Button, Drawer, Stack, TextField} from "@mui/material";
import {addProjectApi} from "@/pages/app/api";

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

interface EditDrawerProps {
    open: boolean;

    handleClose(open: boolean): void;
}

const EditDrawer = ({open, handleClose}: EditDrawerProps) => {
    const [values, setValues] = useState(Object.fromEntries(TABLE_DATA.map(key => [key, ""])))
    const handleAdd = () => addProjectApi(values as Project)

    const handleChange = (input: string, value: string) => {
        setValues(prevState => ({...prevState, [input]: value}))
    }

    return (
        <Drawer open={open} onClose={handleClose} anchor='right'>
            <Stack sx={{p: 2, pt: 2}} gap={2}>
                {TABLE_DATA.map(input => <TextField key={input} value={values[input]} placeholder={input}
                                                    onChange={e => handleChange(input, e.target.value)}/>)}
            </Stack>
            <Button onClick={handleAdd}>Add</Button>
        </Drawer>
    )
}

export default EditDrawer