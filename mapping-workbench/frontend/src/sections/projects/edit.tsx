import {Drawer, Input} from "@mui/material";

const TABLE_DATA = ['title', 'identifier', 'description', 'start_date', 'end_date']

interface EditDrawerProps {
    open: boolean;

    handleClose(open: boolean): void;
}

const EditDrawer = ({open, handleClose}: EditDrawerProps) => {
    return (
        <Drawer open={open} onClose={handleClose} anchor='right'>
            {TABLE_DATA.map(input => <Input key={input} value={input}/>)}
        </Drawer>
    )
}

export default EditDrawer