import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard, TaskDetails, AddTask } from './component'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/addtodo' element={<AddTask />} />
        <Route path='/task/:id' element={<TaskDetails />} />
      </Routes>
    </Router>


  );
}

export default App;
