import './main.css'
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from './Home'
import AddFile from './AddFile';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='add' element={<AddFile />}/>        
      </Routes>
    </BrowserRouter>
  )
}

export default App
