import {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import './App.css'
import FormAboutFile from './pages/forms/formAbout/FormAboutFile';
import { useState } from 'react';
import FormExperienceFile from './pages/forms/formExperience/FormExperienceFile'
import FormEducationFile from './pages/forms/formEducation/FormEducationFile'
import Resume from './pages/resumePage/Resume';

function App() {
  const [form, setForm] = useState(null)
  const [resumeForm, setResumeForm] = useState(null)

  let HAS_ACCESS_TO_SECOND_FORM = form !== null && form.hasOwnProperty('name')
  let HAS_ACCESS_TO_THIRD_FORM = form !== null && form.hasOwnProperty('experiences')

  const handleData = (data) => {
    setForm(prev => {
      if(data.experiences) {
        return {
          ...prev, 
          experiences: data.experiences.map(item => {
            return {...item, start_date: item.start_date.replace(/-/g, '/'), due_date: item.due_date.replace(/-/g, '/')}
          })
        }
      }else {
        return {...prev, ...data}
      }
    })
  }

  const handleResumeData = (data) => {
    setResumeForm(data)
  }

  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('react-form-app'))
    const savedResumeForm = JSON.parse(localStorage.getItem('react-resume-form-app'))
    if(savedForm) {
      setForm(savedForm)
      setResumeForm(savedResumeForm)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('react-form-app', JSON.stringify(form))
    localStorage.setItem('react-resume-form-app', JSON.stringify(resumeForm))
  }, [form, resumeForm])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/formAbout' element={<FormAboutFile handleData={handleData}/>} />
        {HAS_ACCESS_TO_SECOND_FORM && <Route path='/formExperience' element={<FormExperienceFile form={form} handleData={handleData}/>}/>}
        {HAS_ACCESS_TO_THIRD_FORM && <Route path='/formEducation' element={<FormEducationFile handleResumeData={handleResumeData} form={form} handleData={handleData}/>}/>}
        {resumeForm !== null && <Route path='/resume' element={<Resume resumeForm={resumeForm}/>}/>}
      </Routes>
    </Router>
  );
}

export default App;
