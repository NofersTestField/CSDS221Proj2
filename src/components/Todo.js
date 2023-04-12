import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
    return (
        <div className='Todo'>
            <div>{task.task}</div>
            <div>{task.description}</div>
            <div>{task.ddl}</div>
            <div>{task.priority}</div>
            <div onClick={ () => toggleComplete(task.id) }>{task.completed ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</div>
            <div id='todo-actions'>
                {task.completed ? "" : <button className='todo-btn' id='upd-btn' onClick={() => editTodo(task.id)}><FontAwesomeIcon icon={faPenToSquare} className='icon' />Update</button>}
                <button className='todo-btn' id='dlt-btn' onClick={() => deleteTodo(task.id)}><FontAwesomeIcon icon={faTrash} className='icon' />Delete</button>
                {/* <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} /> */}
                {/* <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} /> */}
            </div>
        </div>
    )
}