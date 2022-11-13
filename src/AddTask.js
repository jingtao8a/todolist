import React from 'react';
import addIcon from './assets/add.jpg'
import "./css/AddTask.css"

class AddTask extends React.Component {
    getInputText() {
        let inputText = document.getElementsByClassName("inputText")[0];
        let value = inputText.value;
        inputText.value = null;//将输入框清空
        return value;
    }
    
    render() {
        return (
        <div className='AddTask'>
            <input className='inputText' type="text" placeholder='Add new task ...'></input>
            <button className='addButton' onClick={() => { this.props.addTask(this.getInputText()) }}><img src={addIcon} alt=''></img></button>
        </div>);
    }
}

export default AddTask;