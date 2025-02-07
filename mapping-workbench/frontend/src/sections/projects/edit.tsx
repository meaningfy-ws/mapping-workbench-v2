import {Button, Drawer, Input, Stack, TextField} from "@mui/material";
import {addProjectApi} from "@/api";
import {useState} from "react";

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

interface EditDrawerProps {
    open: boolean;

    handleClose(open: boolean): void;
}

const EditDrawer = ({open, handleClose}: EditDrawerProps) => {
    const handleAdd = addProjectApi()
    const [values, setValues] = useState(Object.fromEntries(TABLE_DATA.map(key => [key, ""])))
    console.log(values)
    return (
        <Drawer open={open} onClose={handleClose} anchor='right'>
            <Stack sx={{p: 2, pt: 2}} gap={2}>
                {TABLE_DATA.map(input => <TextField key={input} value={values[input]} placeholder={input}
                                                  onChange={e => console.log(e)}/>)}
                                                    // onChange={e => setValues(prev => ({...prev, [input]: e}))}/>)}
            </Stack>
            <Button onClick={() => addProjectApi()}>Add</Button>
        </Drawer>
    )
}

export default EditDrawer