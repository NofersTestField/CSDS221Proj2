import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { TextField } from '@mui/material'
import { RadioGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Radio } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

export const TodoForm = ({addTodo, closeForm}) => {
    const [taskValue, setTaskValue] = useState("");
    const [desValue, setDesValue] = useState("");
    const [ddlValue, setDDLValue] = useState(dayjs());
    const [priorityValue, setPriorityValue] = useState("Low");

    const [calendarOn, setCalendarOn] = useState(false);

    const [taskError, setTaskError] = useState(false);
    const [desError, setDesError] = useState(false);
    const [ddlError, setDDLError] = useState(false);

    const handleRadioSelect = e => {
        setPriorityValue(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (taskValue == "" || desValue == "" || ddlValue.format("MM/DD/YYYY") == "") {
            if (taskValue == "") {
                setTaskError(true);
            }
            else{
                setTaskError(false);
            }
            if (desValue == "") {
                setDesError(true);
            }
            else{
                setDesError(false);
            }
            if (ddlValue.format("MM/DD/YYYY") == "") {
                setDDLError(true);
            }
            else{
                setDDLError(false);
            }
        }
        else {
            if (addTodo({task: taskValue, des: desValue, ddl: ddlValue.format("MM/DD/YYYY"), priority: priorityValue})){
                setTaskValue("")
                setDesValue("");
                setDDLValue(dayjs());
                setTaskError(false);
            }
            else {
                setTaskError(true);
            }
        }
    }

    const handleCancel = e => {
        e.preventDefault();

        closeForm();

        setTaskValue("");
        setDesValue("");
        setDDLValue(dayjs());
    }

    return (
        <div>
            <div id='blur-bg'></div>
            <form className='TodoForm' onSubmit={handleSubmit}>
                <h1><FontAwesomeIcon className='icon' icon={faCirclePlus} />Add Task</h1>
                <TextField error={taskError} helperText={taskError ? "Invalid Task" : " "} size="small" focused={true} id='task-input' value={taskValue} label='Task:' onChange={(e) => setTaskValue(e.target.value)}/>
                <TextField error={desError} helperText={desError ? "Invalid Description" : " "} size="small" focused={true} id='des-input' value={desValue} label='Description:' onChange={(e) => setDesValue(e.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker size="small" focused={true} id='ddl-input' value={ddlValue} label='Deadline:' format="MM/DD/YYYY" onChange={(newValue) => {setDDLValue(newValue); console.log(newValue.format("MM/DD/YYYY"))}} />
                </LocalizationProvider>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Low"
                    name="radio-buttons-group"
                    onChange={handleRadioSelect}
                >
                    <FormControlLabel value="Low" control={<Radio />} label="Low" />
                    <FormControlLabel value="Med" control={<Radio />} label="Med" />
                    <FormControlLabel value="High" control={<Radio />} label="High" />
                </RadioGroup>
                <div id='todo-btn-group'>
                    <button type='submit' className='todo-btn' id='submit-btn'><FontAwesomeIcon className='icon' icon={faCirclePlus} />Add</button>
                    <button type='button' className='todo-btn' id='cancel-btn' onClick={handleCancel}><FontAwesomeIcon className='icon' icon={faBan} />Cancel</button>
                </div>
            </form>
        </div>        
    )
}