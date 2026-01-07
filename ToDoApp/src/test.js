// Import your store (adjust path as needed)
// If in same file for testing, just use the variable name directly
import tasks from './ToDoStore.js'; 

const logHeader = (msg) => console.log(`\n--- ${msg} ---`);
const getState = () => tasks.getState().tasks;

// 1. TEST: Add Task
logHeader("1. Testing addTask");
tasks.getState().addTask('Buy Milk');
tasks.getState().addTask('Walk Dog');

console.log("Current State:", getState());

if (getState()['Buy Milk'] === false) console.log("✅ addTask Passed");
else console.error("❌ addTask Failed");


// 2. TEST: Toggle Task
logHeader("2. Testing toggleTask");
// Toggle 'Buy Milk' from false -> true
tasks.getState().toggleTask('Buy Milk');

console.log("State after toggle:", getState());

if (getState()['Buy Milk'] === true) console.log("✅ toggleTask Passed");
else console.error("❌ toggleTask Failed");


// 3. TEST: Edit Task
logHeader("3. Testing editTask");
// Rename 'Buy Milk' (which is true) to 'Buy Coffee'
tasks.getState().editTask('Buy Milk', 'Buy Coffee');

console.log("State after edit:", getState());

const tasksList = getState();
// Check if new name exists AND keeps the 'true' status
if (tasksList['Buy Coffee'] === true && tasksList['Buy Milk'] === undefined) {
    console.log("✅ editTask Passed");
} else {
    console.error("❌ editTask Failed");
}


// 4. TEST: Delete Task
logHeader("4. Testing deleteTask");
tasks.getState().deleteTask('Walk Dog');

console.log("State after delete:", getState());

if (getState()['Walk Dog'] === undefined) console.log("✅ deleteTask Passed");
else console.error("❌ deleteTask Failed");