import useTaskStore from './ToDoStore.js';
import { useState } from 'react';

function TaskAdder(){
    const addTask = useTaskStore((state) => state.addTask); // Importing the action addTask from the ToDoStore.js to add the task
    const [inputText, setInputText] = useState(''); //using this hook as input text is just a temporary state

    // Task Handler // 
    const handleAdd = (e) => { // It handles any input error as well as enters the input task in the tasks store using addTask action from that file
        e.preventDefault(); 

        if(!(inputText.trim())) return;
        addTask(inputText);
        setInputText('');
    }

    return (
        <>
        {/* Input Section */}
        <form onSubmit={handleAdd} className="input-group">
          <input 
            type="text"
            className="main-input"
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            placeholder="What needs to be done?"
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
    </>
    )

}

export default TaskAdder;
