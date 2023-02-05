import React from 'react'
import FormAboutCSS from './FormAbout.module.css'
import mailIcon from '../../../../assets/icons/mail.png'
import phoneIcon from '../../../../assets/icons/phone.png'

const FormAboutCv = ({formData, phone}) => {
  return (
    <div className={FormAboutCSS['form-about-resume']}>
        <div className={FormAboutCSS['form-about-resume-info']}>
            <h2>{formData.firstName} {formData.lastName}</h2>
            {formData.email.length > 1 && <div className={FormAboutCSS.mail}>
                <img src={mailIcon} alt='mail icon'/>
                <span>{formData.email}</span>
            </div>}
            {phone.length > 1 && <div className={FormAboutCSS.phone}>
                <img src={phoneIcon} alt='phone icon'/>
                <span>{phone}</span>
            </div>}
            {formData.aboutMe.length > 1 && <div className={FormAboutCSS['about-me']}>
                <h3>ჩემ შესახებ</h3>
                <p>{formData.aboutMe}</p>
            </div>}
        </div>
        <div className={FormAboutCSS['form-about-resume-image']}>
            {formData.image.length > 1 && <img src={formData.image} alt='profile'/>}
        </div>
    </div>
  )
}

export default FormAboutCv