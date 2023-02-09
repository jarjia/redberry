import React from 'react'
import FormAboutCSS from './FormAbout.module.css'
import mailIcon from '../../../../assets/icons/mail.png'
import phoneIcon from '../../../../assets/icons/phone.png'

const FormAboutCv = ({formData, phone}) => {
  return (
    <div className={FormAboutCSS['form-about-resume']}>
        <div className={FormAboutCSS['form-about-resume-info']}>
            <h2>{formData.name} {formData.surname}</h2>
            {formData.email.length > 0 && <div className={FormAboutCSS.mail}>
                <img src={mailIcon} alt='mail icon'/>
                <span>{formData.email}</span>
            </div>}
            {phone.length > 0 && <div className={FormAboutCSS.phone}>
                <img src={phoneIcon} alt='phone icon'/>
                <span>{phone}</span>
            </div>}
            {formData.about_me.length > 0 && <div className={FormAboutCSS['about-me']}>
                <h3>ჩემ შესახებ</h3>
                <p>{formData.about_me}</p>
            </div>}
        </div>
        <div className={FormAboutCSS['form-about-resume-image']}>
            {formData.image.length > 0 && <img src={formData.image} alt='profile'/>}
        </div>
    </div>
  )
}

export default FormAboutCv