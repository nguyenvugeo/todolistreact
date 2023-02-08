import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


function ActionButtons({index, openForm, handleDeleteItem}) {
    
    const getDelete = () => {
        handleDeleteItem(index)
    }

    const getEdit = () => {
        openForm(index)
    }


    return (
        <div className='button-group'>
            <EditIcon onClick={getEdit} sx={{color: "green", margin: "0 10px"}} />
            <DeleteForeverIcon onClick={getDelete} sx={{color: "red"}} />
        </div>
    );
}

export default ActionButtons;