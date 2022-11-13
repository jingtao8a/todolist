import React from 'react';
import Filter from './Filter';
import TaskItem from './TaskItem';
import "./css/TaskList.css"

class TaskList extends React.Component {
    taskArrayToTaskItems(taskArray, type) {
        let array = [];
        for (let i = 0; i < taskArray.length; ++i) {
            if ((type === "All") || 
            (type === "Todo" && taskArray[i].isCompleted === false) || 
            (type === "Done" && taskArray[i].isCompleted)) {
                array.push( <TaskItem
                        modifyStatusOfTaskItemAt={(index, isCompleted)=> this.props.modifyStatusOfTaskAt(index, isCompleted)}
                        deleteTaskItemAt={(index)=> this.props.deleteTaskAt(index) } 
                        index={i} task={taskArray[i]}/>);
            }
        }
        return array;
    }

    render() {
        const taskArray = this.props.taskArray;
        const type = this.props.type;
        return (
            <div className='TaskList'>
                <Filter modifyTypeOfState={(type) => this.props.modifyTypeOfState(type)}/>
                <div className='TaskItems'>
                    {this.taskArrayToTaskItems(taskArray, type)}
                </div>
            </div>
        );
    }
}

export default TaskList;