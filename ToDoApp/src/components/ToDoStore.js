import {create} from 'zustand'

const getInitialState = () => {
    const saved = localStorage.getItem('tasks-storage');
        if(saved){
            try{
                console.log("check 1:", saved);
                return JSON.parse(saved);

            }catch(error){
                console.log('Exception error: ', error);
            }
        }
        
        return {tasks: {}};

    }


const useTaskStore = create((set) => ({
    
    tasks: getInitialState().tasks,
    addTask: (task) => set((state) => {
    const newTasks = { ...state.tasks, [task]: false };
    
    // Manual Save: Update LocalStorage immediately after changing state
    localStorage.setItem('tasks-storage', JSON.stringify({ tasks: newTasks }));
    
    return { tasks: newTasks };
}),

    editTask: (oldTask, newTask) => set(
        (state) => {
            const allTasks = { ...state.tasks };
            const isCompleted = allTasks[oldTask];
            delete allTasks[oldTask];
            allTasks[newTask] = isCompleted;
            localStorage.setItem('tasks-storage', JSON.stringify({ tasks: allTasks }));
            return {tasks: allTasks};
        }
    ),

    deleteTask: (task) => set(
        (state) => {
            const allTasks = { ...state.tasks};
            delete allTasks[task];
            localStorage.setItem('tasks-storage', JSON.stringify({ tasks: allTasks }));
            return {tasks: allTasks};
        }
    ),

    toggleTask: (task) => set(
        (state) => {
            const allTasks = { ...state.tasks };
            allTasks[task] = !allTasks[task];
            localStorage.setItem('tasks-storage', JSON.stringify({ tasks: allTasks }));
            return {tasks: allTasks};
        }
    ),





}));
    
export default useTaskStore;
    