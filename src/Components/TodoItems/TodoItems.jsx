import React, { useState, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ActionButtons from '../ActionButtons/ActionButtons';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function TodoItems({todos, hello, handleRemove, clearAllTodo, handleStatusChange, handleDeleteItem, handleEditTodo}) {
    const [openInex, setOpenIndex] = useState(false);
    const [level, setLevel] = useState([1]);
    const inputEL = useRef(null);

    const ColorButton = styled(Button)(({ theme }) => ({
        height: "55px",
        backgroundColor: "blue",
      }));

    const [checked, setChecked] = React.useState('');

    const handleToggle = (value, index) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
        handleStatusChange(index);
      };

    const openForm = (index) => {
        setOpenIndex(index)
    }

    const getAllValue = () => {
        clearAllTodo();
    }

    const getCompleteInput = () => {
        handleRemove()
    };

    const getNewValue = (index) => {
        let newValue = inputEL.current.value;
        let newLevel = level;
        handleEditTodo(newValue, index, newLevel);
        setOpenIndex(false);
    }

    const handleChange = (event) => {
        setLevel(event.target.value)
    };

    return (
            <List sx={{ width: '100%', maxWidth: "80%" , bgcolor: 'background.paper' }}>
                {todos.map((value, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                    <ListItem
                        className={value.status}
                        key={index}
                        disablePadding
                    >
                        <ListItemButton role={undefined}  dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={handleToggle(value, index)}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.todo} />
                        <h4>Level: {value.level}</h4>
                        {
                            openInex === index && (
                                <div className="edit-form">
                                    <TextField inputRef={inputEL} style={{width: "40%"}} label="Edit Todo" variant="outlined"/>
                                    <FormControl style={{width: "30%"}} >
                                        <InputLabel id="demo-simple-select-label">Level</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={level}
                                            label="Level: 1"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>Level: 1</MenuItem>
                                            <MenuItem value={2}>Level: 2</MenuItem>
                                            <MenuItem value={3}>Level: 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <ColorButton onClick={()=>getNewValue(index)} variant="contained">Edit Done</ColorButton>
                                </div>
                            )
                        }
                        <ActionButtons index={index} handleDeleteItem={handleDeleteItem} openForm={openForm} handleEditTodo={handleEditTodo}/>
                        </ListItemButton>
                    </ListItem>
                    );
                })}
            <div className="group-filter">
                <span>You Have <span className="pendingNum">{hello}</span> Pendingtasks</span>
                <Button onClick={getAllValue} variant="contained">Clear All</Button>
                <Button onClick={getCompleteInput} variant="contained">Clear Complete</Button>
            </div>
            </List>
    );
}

export default TodoItems;