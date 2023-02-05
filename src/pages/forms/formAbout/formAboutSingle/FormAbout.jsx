import React, { useState, useEffect } from 'react'
import FormAboutCSS from './FormAbout.module.css'
import FormAboutCv from './FormAboutCv'
import { Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import Vector from '../../../../assets/icons/Vector.png'
import success from '../../../../assets/icons/success.png'
import warning from '../../../../assets/icons/warning.png'

const georgianPhoneRegex = /^(\+?995)?(79\d{7}|5\d{8})$/;

const FormAbout = ({errors, touched, saveForm, ...props}) => {
    const [phone, setPhone] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [submit, setSubmit] = useState(false)

    const navigate = useNavigate()

    const thumbnail = localStorage.getItem('react-file-data');

    useEffect(() => {
        const savedPhone = localStorage.getItem('react-phone-number')
        if(savedPhone) {
            setPhone(savedPhone)
        }
    }, [])

    useEffect(() => {
        const savedErrMessage = localStorage.getItem('react-errMessage-number')
        if(savedErrMessage) {
            setErrMessage(savedErrMessage)
        }
    }, [])

    useEffect(() => {
        let spacelessNumber = phone.replace(/\s/g, "");
        saveForm({
            ...props.values,
            image: thumbnail || '',
            phone: spacelessNumber
        });
    }, [props.values, saveForm, thumbnail, phone]);

    const refreshPage = () => { 
        window.location.reload(false)
    }

    const formattedPhoneNumber = (value) => {
        if(!value) return value;
        const phoneNumber = value.replace(/[^\d+]/g, '')
        const length = phoneNumber.length
        if(length < 13) {
            setErrMessage('გთხოვთ შეავსოთ')
        }else if(length === 13 && !georgianPhoneRegex.test(phoneNumber)) {
            setErrMessage('უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს')
        }else if(submit === true && phone.length < 1) {
            setErrMessage('გთხოვთ შეავსოთ')
        }else if(length === 13 && georgianPhoneRegex.test(phoneNumber)) {
            setErrMessage('')
        }
        if(length < 5) return phoneNumber
        if(length < 9) {
            return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`
        }
        if(length < 11) {
            return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7)}`
        }
        if(length < 13) {
            return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 9)} ${phoneNumber.slice(9)}`
        }
        return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 9)} ${phoneNumber.slice(9, 11)} ${phoneNumber.slice(11, 13)}`
    }

    const handlePhone = (e) => {
        const formatted = formattedPhoneNumber(e.target.value)
        setPhone(formatted)
        localStorage.setItem('react-phone-number', formatted) 
        localStorage.setItem('react-errMessage-number', errMessage) 
    }

  return (
    <div className={FormAboutCSS['form-about-parent']}>
        <div className={FormAboutCSS['form-about-div']}>
            <Link to='/'><button className={FormAboutCSS['home-back-btn']} onClick={() => localStorage.clear('react-redberry-data')}><img src={Vector} alt='left arrow'/></button></Link>
            <header className={FormAboutCSS['form-about-header']}>
                <h2>ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ</h2>
                <span>1/3</span>
            </header>
            <Form className={FormAboutCSS['form-about']}>
                <div className={FormAboutCSS['fullname-div']}>
                    <div className={FormAboutCSS['single-input']}>
                        <label htmlFor='firstName' className={`${errors.firstName && touched.firstName && FormAboutCSS['label-red']}`}>სახელი</label>
                        <div>
                            <Field type='text' name='firstName' className={`${FormAboutCSS['text-input']} ${(errors.firstName && touched.firstName && FormAboutCSS['text-input-red']) 
                            || (!errors.firstName && props.values.firstName.length > 0 && FormAboutCSS['text-input-green'])}`} autoComplete="new-password"/>
                            {!errors.firstName && props.values.firstName.length > 0 && <img src={success} alt='success icon' className={`${FormAboutCSS.success}`}/>}
                            {errors.firstName && touched.firstName && <img src={warning} alt='warning icon' className={`${FormAboutCSS.warning}`}/>}
                        </div>
                        <small className={FormAboutCSS.small}>
                            {`${errors.firstName && touched.firstName ? errors.firstName : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'}`}
                        </small>
                    </div>
                    <div className={FormAboutCSS['single-input']}>
                        <label htmlFor='lastName' className={`${errors.lastName && touched.lastName && FormAboutCSS['label-red']}`}>გვარი</label>
                        <div>
                            <Field type='text' name='lastName' className={`${FormAboutCSS['text-input']} ${(errors.lastName && touched.lastName && FormAboutCSS['text-input-red']) 
                            || (!errors.lastName && props.values.lastName.length > 0 && FormAboutCSS['text-input-green'])}`}/>
                            {!errors.lastName && props.values.lastName.length > 0 && <img src={success} alt='success icon' className={`${FormAboutCSS.success}`}/>}
                            {errors.lastName && touched.lastName && <img src={warning} alt='warning icon' className={`${FormAboutCSS.warning}`}/>}
                        </div>
                        <small className={FormAboutCSS.small}>
                            {`${errors.lastName && touched.lastName ? errors.lastName : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'}`}
                        </small>
                    </div>
                </div>
                <div className={`${FormAboutCSS['single-input']} ${FormAboutCSS['single-input-image']}`}>
                <label className={`${FormAboutCSS['file-label']} ${submit === true && thumbnail === null && FormAboutCSS['label-red']}`}>
                    პირადი ფოტოს ატვირთვა
                    <Field
                        type="file" 
                        onChange={(e) => {
                            e.preventDefault()
                            const image = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(image)
                            reader.addEventListener('load', () => {
                                localStorage.setItem('react-file-data', reader.result);
                                refreshPage()
                            });
                        }}
                        value={undefined}
                        name='image'
                        id='file-upload'
                        className={FormAboutCSS.file}
                        accept="image/png, image/jpeg, image/jpg, image/gif" 
                    />
                    <span>ატვირთვა</span>
                    {submit === true && thumbnail === null && <img src={warning} alt='warning icon' className={`${FormAboutCSS.warning}`}/>}
                </label>
                </div>
                <div className={FormAboutCSS['single-input']}>
                    <label htmlFor='aboutMe'>ჩემ შესახებ (არასავალდებულო)</label>
                    <Field as='textarea' name='aboutMe' className={FormAboutCSS['text-input-textarea']} autoComplete="new-password"/>
                </div>
                <div className={FormAboutCSS['single-input']}>
                    <label htmlFor='email' className={`${errors.email && touched.email && FormAboutCSS['label-red']}`}>ელ.ფოსტა</label>
                    <div>
                        <Field type='email' name='email' className={`${FormAboutCSS['text-input']} ${(errors.email && touched.email && FormAboutCSS['text-input-red']) 
                        || (!errors.email && props.values.email.length > 0 && FormAboutCSS['text-input-green'])}`}/>
                        {!errors.email && props.values.email.length > 0 && <img src={success} alt='success icon' className={`${FormAboutCSS.success}`}/>}
                        {errors.email && touched.email && <img src={warning} alt='warning icon' className={`${FormAboutCSS.warning}`}/>}
                    </div>
                    <small className={FormAboutCSS.small}>
                        {`${errors.email && touched.email ? errors.email : 'უნდა მთავრდებოდეს @redberry.ge-ით'}`}
                    </small>
                </div>
                <div className={FormAboutCSS['single-input']}>
                    <label htmlFor='phone' className={`${((errMessage.length > 0) || (submit === true && phone.length < 1)) && FormAboutCSS['label-red']}`}>მობილურის ნომერი</label>
                    <div>
                        <Field type='text' name='phone'
                            value={phone}
                            onChange={handlePhone}
                            className={`${FormAboutCSS['text-input']}
                             ${errMessage.length < 1 && phone.length === 17 && FormAboutCSS['text-input-green']} 
                             ${((errMessage.length > 0) || (submit === true && phone.length < 1)) && FormAboutCSS['text-input-red']}`}
                        />
                        {errMessage.length < 1 && phone.length === 17 && <img src={success} alt='success icon' className={`${FormAboutCSS.success}`}/>}
                        {((errMessage.length > 0) || (submit === true && phone.length < 1)) && <img src={warning} alt='warning icon' className={`${FormAboutCSS.warning}`}/>}
                    </div>
                    <small className={FormAboutCSS.small}>
                        {((errMessage.length > 0) || (submit === true && phone.length < 1)) ? 'გთხოვთ შეავსოთ' : 'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს'}
                    </small>
                </div>
                <button type='submit' onClick={() => {
                    setSubmit(true)
                    setTimeout(() => {
                        navigate('/formExperience')
                    }, 100)
                }} className={FormAboutCSS['next-btn']}>ᲨᲔᲛᲓᲔᲒᲘ</button>
            </Form>
        </div>
        <FormAboutCv formData={props.values} phone={phone}/>
    </div>
  )
}

export default FormAbout