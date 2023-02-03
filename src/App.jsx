import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import FormAbout from './pages/forms/formAbout/FormAbout';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/formAbout' element={<FormAbout />}/>
      </Routes>
    </Router>
  );
}

export default App;
