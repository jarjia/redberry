import {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, json } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import './App.css'
import FormAboutFile from './pages/forms/formAbout/FormAboutFile';
import { useState } from 'react';
import FormExperienceFile from './pages/forms/formExperience/FormExperienceFile'

function App() {
  const [form, setForm] = useState(null)

  const HAS_ACCESS_TO_SECOND_FORM = form !== null && form.hasOwnProperty('firstName')

  const handleData = (data) => {
    setForm(prev => {
      return {...prev, ...data}
    })
  }

  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('react-form-app'))
    if(savedForm) {
      setForm(savedForm)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('react-form-app', JSON.stringify(form))
  }, [form])

  console.log('final form: ', form);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/formAbout' element={<FormAboutFile handleData={handleData}/>} />
        {HAS_ACCESS_TO_SECOND_FORM && <Route path='/formExperience' element={<FormExperienceFile form={form} handleData={handleData}/>}/>}
        <Route path='/me' element={<h1>me</h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
