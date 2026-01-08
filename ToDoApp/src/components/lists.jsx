import useTaskStore from './ToDoStore';
import useFilterStore from './filterStore';
import { useState } from 'react';

function Lists(){
  
  const tasks = useTaskStore((state) => state.tasks); 
  const toggleTask = useTaskStore((state) => state.toggleTask); // it imports toggle task action from Task Store created in ToDoStore.js
  const deleteTask = useTaskStore((state) => state.deleteTask); // it imports delete task action from Task Store created in ToDoStore.js
  const editTask = useTaskStore((state) => state.editTask); // it imports edit task action from Task Store created in ToDoStore.js


  const filter = useFilterStore((state) => state.filter); //It takes filter global state from filter Store
  const setFilter = useFilterStore((state) => state.setFilter); // Setting filter's global state

    // -- Local UI States for input and Editing
    const [editingTarget, setEditingTarget] = useState(''); // Editing Target is used for choosing the target that is needed to be editted. It is set to be local state as it is not needed all software wide but just for quick usage and then not needed. It takes the text as its editing target as there is no ID
    const [inputEditText, setInputEditText] = useState(''); // New Input to put when Edit text is pressed
    
    //
        // 1. This function start the editing of task when pencil icon is pressed
    const startEdit = (taskName) => { 
        setEditingTarget(taskName);    // Tell UI which task is being edited
        setInputEditText(taskName);    // Pre-fill the input with the current name
    };

    // 2. On clicking save button, this handler updates the tasks store by calling its action "editTask". It also evaluates that if there is no change or text is empty
    const handleEditSave = () => {
        // Validation: Don't save if empty or if name hasn't changed
        if (!inputEditText.trim() || inputEditText === editingTarget) {
        setEditingTarget(null); // Just exit if nothing changed
        return;
        }

        // Call the store function
        editTask(editingTarget, inputEditText);

        // Reset UI state
        setEditingTarget(null);
        setInputEditText('');
    };

    // 3. If cancel edit button is pressed, no editing is done and set Editing target sets the updating value to be null, i.e no change
    const handleCancelEdit = () => {
        setEditingTarget(null);
        setInputEditText('');
    };
    //

    const handleDelete = (task) => {
        useTaskStore.getState().deleteTask(task);
    }

    const handleToggleTask = (task) => {
        useTaskStore.getState().toggleTask(task);
    }

    //
    const filteredTasks = Object.entries(tasks || {}).filter(([taskName, isCompleted]) => { //Object.entries makes the key value pairs into list 2d list entries, so that, key is first element of that list and value is second element.
        if (filter === 'completed') return isCompleted === true;
        if (filter === 'active') return isCompleted === false;
        return true; // if filter is 'all', return everything
    });

    return (
        <div>
        <ul className="task-list">
        {filteredTasks.length === 0 ? (
            <li className="empty-message">No tasks found.</li>
          ) : (
            filteredTasks.map(([taskName, isCompleted]) => (
              <li key={taskName} className={`task-item ${isCompleted ? 'completed' : ''}`}>
    
              {editingTarget === taskName ? (
                // --- EDIT MODE ---
                <div className="edit-mode">
                  <input 
                    className="edit-input"
                    value={inputEditText} 
                    onChange={(e) => setInputEditText(e.target.value)}
                    autoFocus
                  />
                  <div className="action-buttons">
                      {/* Call handleEditSave here */}
                      <button className="btn btn-success" onClick={handleEditSave}>Save</button>
                      {/* Call handleCancelEdit here */}
                      <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                // --- VIEW MODE ---
                <>
                  <div className="task-content" onClick={() => toggleTask(taskName)}>
                    <span className="checkbox">{isCompleted ? '✔' : ''}</span>
                    <span className="task-text">{taskName}</span>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className="icon-btn edit-btn" 
                      onClick={() => startEdit(taskName)} // <--- CHANGED THIS
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button 
                      className="icon-btn delete-btn" 
                      onClick={() => deleteTask(taskName)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
          </li>
            ))
          )}
        </ul>
      </div>
    )

}

export default Lists;