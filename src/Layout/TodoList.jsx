import React, {useState} from 'react';
import Container from '@mui/material/Container';
import AddNewTodo from '../Components/Addnewtodo/AddNewTodo';
import TodoItems from '../Components/TodoItems/TodoItems';


function TodoList(props) {
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    
    const hello = data.length;

    const [todos, setTodos] = useState(
        data
    )

    const handleNewTodo = (value, level) => {
        let newTodo = {
            todo: value,
            status: "pending",
            level: level,
        }
        todos.push(newTodo);
        let newTodos = [...todos];
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos(newTodos)
    }

    const handleStatusChange = (index) => {
        if(todos[index].status === "done") {
            todos[index].status = "pending"
        }else {
            todos[index].status = "done"
        }
    }

    const handleDeleteItem = (index) => {
        todos.splice(index, 1);
        let newTodos = [...todos];
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos(newTodos);
    }

    const handleEditTodo = (newValue, index, level) => {
        let newTodo = {
            todo: newValue,
            status: "pending",
            level: level,
        }
        todos[index] = newTodo;
        let newTodos = [...todos];
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos(newTodos);
    }

    const clearAllTodo = () => {
        let todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos(todos)
    }

    const handleRemove = () => {
        const statusDone = "done";
        let removeTodo = todos.filter(function(item) {
            return item.status !== statusDone;
        });
        setTodos(removeTodo);
        localStorage.setItem("todos", JSON.stringify(removeTodo));

    }

    return (
            <React.Fragment>
                <Container maxWidth="lg">
                    <AddNewTodo handleNewTodo={handleNewTodo} />
                    <TodoItems todos={todos} handleRemove={handleRemove} clearAllTodo={clearAllTodo} hello={hello} handleStatusChange={handleStatusChange} handleDeleteItem={handleDeleteItem} handleEditTodo={handleEditTodo}/>
                </Container>
            </React.Fragment>
    );
}

export default TodoList;