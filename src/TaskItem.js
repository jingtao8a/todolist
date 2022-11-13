import React from 'react';
import "./css/TaskItem.css"

class TaskItem extends React.Component {
    render() {
        return (
            <div className='TaskItem'>
                <input className='InputCheckBox' 
                    type='checkbox' 
                    onChange={() => {this.props.modifyStatusOfTaskItemAt(this.props.index, !this.props.task.isCompleted)}}
                    checked={this.props.task.isCompleted}></input>
                <div className='TaskName'>{this.props.task.taskName}</div>
                <button className='DeleteButton' onClick={()=>this.props.deleteTaskItemAt(this.props.index)}>Delete</button>
            </div>
        );
    }
}

export default TaskItem;