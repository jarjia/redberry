import {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import './App.css'
import FormAboutFile from './pages/forms/formAbout/FormAboutFile';
import { useState } from 'react';
import FormExperienceFile from './pages/forms/formExperience/FormExperienceFile'
import FormEducationFile from './pages/forms/formEducation/FormEducationFile'

function App() {
  const [form, setForm] = useState(null)

  let HAS_ACCESS_TO_SECOND_FORM = form !== null && form.hasOwnProperty('firstName')
  let HAS_ACCESS_TO_THIRD_FORM = form !== null && form.hasOwnProperty('experiences')

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
  console.log(HAS_ACCESS_TO_THIRD_FORM);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/formAbout' element={<FormAboutFile handleData={handleData}/>} />
        {HAS_ACCESS_TO_SECOND_FORM && <Route path='/formExperience' element={<FormExperienceFile form={form} handleData={handleData}/>}/>}
        {HAS_ACCESS_TO_THIRD_FORM && <Route path='/formEducation' element={<FormEducationFile handleData={handleData}/>}/>}
      </Routes>
    </Router>
  );
}

export default App;
