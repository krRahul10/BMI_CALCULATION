
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Login from './Components/Login';
import Register from './Components/Register';
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

    </div>
  );
}

export default App;
