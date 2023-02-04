import React from 'react'
import FormAboutCSS from './FormAbout.module.css'
import mail from '../../../../assets/icons/mail.png'
import phone from '../../../../assets/icons/phone.png'

const FormAboutCv = ({formData}) => {
    // console.log('cv', formData);
  return (
    <div className={FormAboutCSS['form-about-resume']}>
        <div className={FormAboutCSS['form-about-resume-info']}>
            <h2>{formData.firstName} {formData.lastName}</h2>
            {formData.email.length > 1 && <div className={FormAboutCSS.mail}>
                <img src={mail} alt='mail icon'/>
                <span>{formData.email}</span>
            </div>}
            {formData.phone.length > 1 && <div className={FormAboutCSS.phone}>
                <img src={phone} alt='phone icon'/>
                <span>{formData.phone}</span>
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