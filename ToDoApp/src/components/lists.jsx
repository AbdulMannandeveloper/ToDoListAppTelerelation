import useTaskStore from './ToDoStore';
import useFilterStore from './filterStore';
import { useState } from 'react';

function Lists(){
  
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const editTask = useTaskStore((state) => state.editTask);


  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

    // -- Local UI States for input and Editing
    const [editingTarget, setEditingTarget] = useState('');
    const [inputEditText, setInputEditText] = useState('');
    
    //
        // 1. START EDITING: Runs when you click the Pencil ✏️
    const startEdit = (taskName) => {
        setEditingTarget(taskName);    // Tell UI which task is being edited
        setInputEditText(taskName);    // Pre-fill the input with the current name
    };

    // 2. SAVE EDIT: Runs when you click "Save"
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

    // 3. CANCEL EDIT: Runs when you click "Cancel"
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

    const filteredTasks = Object.entries(useTaskStore.getState().tasks || {}).filter(([taskName, isCompleted]) => {
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