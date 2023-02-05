import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import './App.css'
import FormAboutFile from './pages/forms/formAbout/FormAboutFile';
import { useState } from 'react';
import FormExperienceFile from './pages/forms/formExperience/FormExperienceFile'

function App() {
  const [form, setForm] = useState()

  const handleData = (data) => {
    setForm(prev => {
      return {...prev, ...data}
    })
  }

  console.log(form);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/formAbout' element={<FormAboutFile handleData={handleData}/>}/>
        <Route path='/formExperience' element={<FormExperienceFile />}/>
      </Routes>
    </Router>
  );
}

export default App;
