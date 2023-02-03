import React, { useState, useEffect } from 'react'
import FormAboutCSS from './FormAbout.module.css'
import Vector from '../../../assets/Vector.png'
import SingleForm from './SingleForm'

const FormAbout = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        const savedForm = JSON.parse(localStorage.getItem('react-form'))
        console.log(savedForm);
        if(savedForm) {
            setForm(savedForm)
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem("react-form", JSON.stringify(form));
    }, [form])

    const handleChange = (event) => {
        const {name, value} = event.target
        setForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

  return (
    <div className={FormAboutCSS['form-about-parent']}>
        <div className={FormAboutCSS['form-about-div']}>
            <button className={FormAboutCSS['home-back-btn']}><img src={Vector} alt='left arrow'/></button>
            <header className={FormAboutCSS['form-about-header']}>
                <h2>ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ</h2>
                <span>1/3</span>
            </header>
            <form className={FormAboutCSS['form-about']}>
                <div className={FormAboutCSS['fullname-div']}>
                    <SingleForm type='text' label='სახელი' name='firstName' value={form.firstName} handleChange={handleChange}/>
                    <SingleForm type='text' label='გვარი' name='lastName' value={form.lastName} handleChange={handleChange}/>
                </div>
            </form>
        </div>
        <div className={FormAboutCSS['form-about-resume']}>

        </div>
    </div>
  )
}

export default FormAbout