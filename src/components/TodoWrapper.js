import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Snackbar } from '@mui/material';

uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingID] = useState("");

    const [msg, setMSG] = useState("Success");

    const addTodo = todo => {
        if (todos.every((t) => todo.task != t.task)){
            // setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
            // setTodos([...todos, {id: uuidv4(), task: "Test Task", description: "Test Description", ddl: "Test DDL", priority: "Test Priority", completed: false}])
            setTodos([...todos, {id: uuidv4(), task: todo.task, description: todo.des, ddl: todo.ddl, priority: todo.priority, completed: false}])

            setIsAdding(false);

            setMSG("Added Successfully");

            return true;
        }
        else {
            return false;
        }
    }

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));

        setMSG("Deleted Successfully");
    }

    const editTodo = id => {
        setEditingID(id);
        setIsEditing(true);
    }

    const editTask = task => {
        if (todos.every((todo) => todo.task != task.task || todo.id === editingId)){
            setTodos(todos.map(todo => todo.id === editingId ? {id: editingId, task: task.task, description: task.des, ddl: task.ddl, priority: task.priority, completed: false} : todo))

            setIsEditing(false);

            setMSG("Edited Successfully");

            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div className='TodoWrapper'>
            <div>
                <h1 id='title'>FRAMEWORKS</h1>
                <button id="add-task" onClick={() => { setIsAdding(true) }}><FontAwesomeIcon className='icon' icon={faCirclePlus} />Add</button>
            </div>
            <div id='sub-title'>
                <h2>Title</h2>
                <h2>Description</h2>
                <h2>Deadline</h2>
                <h2>Priority</h2>
                <h2>Completed</h2>
                <h2>Actions</h2>
            </div>
            {isEditing ?
                <EditTodoForm prev={todos.find(todo => todo.id === editingId)} editTask={editTask} closeForm={ () => setIsEditing(false) }/>
            :
                isAdding ? <TodoForm addTodo={addTodo} closeForm={ () => setIsAdding(false) } /> : ""}
            {todos.map(todo => (
                <Todo task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            ))}
            <Snackbar
                open={msg != ""}
                autoHideDuration={1000}
                onClose={() => setMSG("")}
                message={msg}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            />
        </div>
    )
}