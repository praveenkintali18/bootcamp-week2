import './App.css';
import React, { useState,useEffect} from "react";
import Header from './Components/Header';
import Tabs from './Components/Tabs';
import checkBox from './Components/checkBox';
import Task from './Components/Task';
import TaskActive from './Components/TaskActive';
import Taskform from './Components/TaskForm';

function App() {
  const [value, setValue] = React.useState(2);
  const[tasks,setTasks]=useState([]);
  useEffect(()=>{
    if(tasks.length===0)return;
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks]);

  useEffect(()=>{
    const tasks=JSON.parse(localStorage.getItem('tasks'));
    const storedTasks = tasks || []; // Use an empty array if tasksFromLocalStorage is null
    setTasks(storedTasks);
    // torage.setItem('tasks',JSON.stringify(tasks));
    // setTasks(tasks);
  },[]);
  
  function addTask(name) {
    setTasks(prev=>{
      return[...prev,{name:name,done:false}]
    });
  }
  function updateTaskDone(taskIndex,newDone) {
    setTasks(prev=>{
      const newTasks=[...prev];
      newTasks[taskIndex].done=newDone
      return newTasks;
    })    
  }
  function removeTask(indexToRemove){
    setTasks(prev=>{
      return prev.filter((taskObject,number)=>number!=indexToRemove);
    });

  }
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  return (
    <main>
    <Header/>
    <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
    <div className="content">
        {activeTab === 'all' && 
        <div>
           <Taskform onAdd={addTask}/>
            {tasks.map((task,number)=>(
              <TaskActive{...task}
              // onTrash={()=> removeTask(number)}
              onToggle={done=> updateTaskDone(number,done)}/>
            ))}
        </div>}
        {activeTab === 'active' && 
        <div>
          <Taskform onAdd={addTask}/>
        {tasks
          .filter(task => !task.done) // Filter tasks whose done value is false
          .map((task, number) => (
            <TaskActive
              key={number}
              {...task}
              onTrash={() => removeTask(number)}
              onToggle={() => updateTaskDone(number, !task.done)} // Pass opposite value of task.done
            />
          ))}
      </div>
        }
          {activeTab === 'completed' &&
            <div>
              {tasks
                .filter(task => task.done) // Filter tasks whose done value is true
                .map((task, number) => (
                  <Task
                    key={number}
                    {...task}
                    onTrash={() => removeTask(number)}
                    onToggle={() => updateTaskDone(number, !task.done)} // Pass opposite value of task.done
                  />
                ))}
            </div>
          }

      </div>
    </main>
  );
}

export default App;
