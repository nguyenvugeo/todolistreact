import React, {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function AddNewTodo({handleNewTodo}) {
    const inputEl = useRef(null);
    const [level, setLevel] = useState([1]);

    const ColorButton = styled(Button)(({ theme }) => ({
        backgroundColor: "green",
        padding: "16px 20px",
        width: "20%",
        '&:hover': {
          backgroundColor: green[400],
        },
    }));

    const handleChange = (event) => {
        setLevel(event.target.value);
    };

    const getValueInput = () => {
        if(inputEl.current.value === "") {
            alert("Please, plugin input some text !!!")
        } else {
            handleNewTodo(inputEl.current.value, level);
            inputEl.current.value = "";
        }
    }
    return (
        <div className='add-todo'>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: '60%',
                }}
            >
                <TextField inputRef={inputEl} style={{width: "70%"}} id="add-todo" label="Add New Todo" variant="outlined" />
                <FormControl style={{width: "30%"}} >
                    <InputLabel id="demo-simple-select-label">Level</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={level}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Level: 1</MenuItem>
                        <MenuItem value={2}>Level: 2</MenuItem>
                        <MenuItem value={3}>Level: 3</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <ColorButton onClick={getValueInput} variant="contained">Add Todo</ColorButton>
        </div>
    );
}

export default AddNewTodo;