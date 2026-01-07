import useTaskStore from './ToDoStore.js';
import { useState } from 'react';

function TaskAdder(){
    const addTask = useTaskStore((state) => state.addTask);
    const [inputText, setInputText] = useState('');

    // Task Handler // 
    const handleAdd = (e) => {
        e.preventDefault(); // <--- THIS LINE IS MISSING!
        console.log(inputText)

        if(!(inputText.trim())) return;
        console.log('test step 1');
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
