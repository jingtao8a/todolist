import './css/App.css';
import TaskList from './TaskList';
import AddTask from './AddTask';
import React from 'react';

const Type = ["All", "Todo", "Done"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskArray:[
        {isCompleted: false, taskName: "task1"},
        {isCompleted: true, taskName: "task2"},
        {isCompleted: false, taskName: "task3"},
      ],
      Type:"All",
    }
  }
  //添加任务
  addTask(taskName) {
    if (!taskName) {//taskName为空直接返回
      return;
    }
    let newTaskArray = this.state.taskArray.slice();
    newTaskArray.push({isCompleted: false, taskName: taskName});
    this.setState({taskArray: newTaskArray});
  }

  //删除任务
  deleteTaskAt(index) {
    if (index == null || index >= this.state.taskArray.length) {
      return;
    }
    let newTaskArray = this.state.taskArray.slice();
    newTaskArray.splice(index, 1);
    this.setState({taskArray: newTaskArray});
  }
  //修改任务状态
  modifyStatusOfTaskAt(index, isCompleted) {
    let newTaskArray = this.state.taskArray.slice();
    console.log(isCompleted);
    newTaskArray[index].isCompleted = isCompleted;
    this.setState({taskArray: newTaskArray});
  }

  //修改state的Type
  modifyTypeOfState(type) {
    if (!Type.includes(type) ) {
      return;
    }
    this.setState({
      Type: type,
    });
  }

  //存储的代码：都在下方
  componentDidMount(){
        var str = localStorage.getItem("state")||"{}";
        //获取本地存储的数据的数据  取不到用“[]”
        var state = JSON.parse(str);//转成js对象
        console.log(state);
        this.setState(state) //更新list
  }
  
  componentDidUpdate(prevProps,prevState){
    localStorage.setItem("state",JSON.stringify(this.state))
        //当数据更新的时候，把数据转换为字符串  存储
  }
  render() {
    return (
      <div className="App">
          <h1 className='title'>ToDoList</h1>
          <AddTask addTask={(taskName) => { this.addTask(taskName) }}/>
          <TaskList
            modifyTypeOfState={(type) => {this.modifyTypeOfState(type)}}
            modifyStatusOfTaskAt={(index, isCompleted) => { this.modifyStatusOfTaskAt(index, isCompleted)}} 
            deleteTaskAt={(index) => {this.deleteTaskAt(index)}} 
            taskArray={this.state.taskArray}
            type={this.state.Type}/>
      </div>
    );
  }
}

export default App;
