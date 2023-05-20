import logo from './logo.svg';
import './App.css';
import Login from './views/Login';
import Dashboard from "./views/Dashboard";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";



function App() {
  return (
    
        <Router>                
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
         </Router> 
         
    
   
  );
}

export default App;
