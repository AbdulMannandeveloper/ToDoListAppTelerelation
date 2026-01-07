import TaskAdder from './components/taskAdder';
import Filters from './components/filter';
import Lists from './components/lists';
import './App.css';

function App(){
  return (
    <>
      <div className="app-container">
        <div className="card">
          <h1 className="title">My Tasks</h1>
            <TaskAdder />
            <Filters />
            <Lists />
        </div>
      </div>
    </>
  );

}

export default App;

