import React from 'react'
import FormAboutCSS from './FormAbout.module.css'

const SingleForm = ({type, name, label, value, handleChange}) => {
  return (
    <div className={FormAboutCSS['single-input']}>
        <label htmlFor={name}>{label}</label>
        <input type={type} className={FormAboutCSS['text-input']} name={name} value={value} onChange={handleChange}/>
        <small className={FormAboutCSS['inp-hint']}>მინიმუმ 2 ასო, ქართული ასოები</small>
    </div>
  )
}

export default SingleForm