import React from 'react'
import homePageCSS from './homePage.module.css'
import rdbrLogo from '../../assets/home/LOGO-02 3.png'
import backImage from '../../assets/home/LOGO-40 1.png'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className={homePageCSS['home-page']}>
        <header className={homePageCSS['home-page-header']}>
            <img src={rdbrLogo} alt='red berry logo' width='236px' height='38px'/>
        </header>
        <div className={homePageCSS['main-btn-div']}>
            <Link to='/formAbout'><button className={homePageCSS['main-btn']}>ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</button></Link>
            <img src={backImage} alt='background' className={homePageCSS['back-img']}/>
        </div>
    </div>
  )
}

export default HomePage