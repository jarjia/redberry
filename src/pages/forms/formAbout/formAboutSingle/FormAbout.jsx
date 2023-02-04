import React, { useState, useEffect } from 'react'
import FormAboutCSS from './FormAbout.module.css'
import FormAboutCv from './FormAboutCv'
import { Field, Form } from 'formik';
import { Link } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input'
import Vector from '../../../../assets/icons/Vector.png'
import success from '../../../../assets/icons/success.png'
import warning from '../../../../assets/icons/warning.png'

const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    image: '',
    aboutMe: '',
    email: '',
    phone: ''
};

const FormAbout = ({errors, touched, saveForm, ...props }) => {
    const [imgVal, setImgVal] = useState(0)

    const previewImage = document.getElementById('img-file');

    const thumbnail = localStorage.getItem('react-file-data');

    const refreshPage = () => { 
        window.location.reload(false)
    }

    // const formattedPhoneNumber = (value) => {
    //     if(!value) return value;
    //     let finalValue = ''
    //     const phoneNumber = value.replace(/[^\d]/g, "");
    //     const phoneNumberLength = phoneNumber.length;
    //     if(phoneNumberLength === 9 && !phoneNumber.includes('+995')) {
    //         finalValue = `+995 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 7)} ${phoneNumber.slice(7, 9)}`
    //         console.log(finalValue);
    //         return finalValue
    //     }
    // }

    setTimeout(() => {
        if (thumbnail) {
            previewImage.setAttribute('src', thumbnail);
        } else {
            previewImage.setAttribute('src', 'default.jpg');
        }
    }, 100)

    useEffect(() => {
        saveForm({
            ...props.values,
            image: thumbnail || ''
        });
    }, [props.values, saveForm]);

    console.log('form', props.values);

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
                            {errors.firstName && touched.firstName && <img src={warning} alt='success icon' className={`${FormAboutCSS.warning}`}/>}
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
                            {errors.lastName && touched.lastName && <img src={warning} alt='success icon' className={`${FormAboutCSS.warning}`}/>}
                        </div>
                        <small className={FormAboutCSS.small}>
                            {`${errors.lastName && touched.lastName ? errors.lastName : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'}`}
                        </small>
                    </div>
                </div>
                <div className={`${FormAboutCSS['single-input']} ${FormAboutCSS['single-input-image']}`}>
                <label className={`${FormAboutCSS['file-label']} ${imgVal > 0 && FormAboutCSS['label-red']}`} onClick={() => setImgVal(prev => prev + 1)}>
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
                    {imgVal > 0 && <img src={warning} alt='success icon' className={`${FormAboutCSS.warning}`}/>}
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
                        {errors.email && touched.email && <img src={warning} alt='success icon' className={`${FormAboutCSS.warning}`}/>}
                    </div>
                    <small className={FormAboutCSS.small}>
                        {`${errors.email && touched.email ? errors.email : 'უნდა მთავრდებოდეს @redberry.ge-ით'}`}
                    </small>
                </div>
                <div className={FormAboutCSS['single-input']}>
                    <label htmlFor='phone' className={`${errors.phone && touched.phone && FormAboutCSS['label-red']}`}>მობილურის ნომერი</label>
                    <div>
                        <Field type='text' name='phone' className={`${FormAboutCSS['text-input']} ${(errors.phone && touched.phone && FormAboutCSS['text-input-red']) 
                        || (!errors.phone && props.values.phone.length > 0 && FormAboutCSS['text-input-green'])}`}
                        />
                        {!errors.phone && props.values.phone.length > 0 && <img src={success} alt='success icon' className={`${FormAboutCSS.success}`}/>}
                        {errors.phone && touched.phone && <img src={warning} alt='success icon' className={`${FormAboutCSS.warning}`}/>}
                    </div>
                    <small className={FormAboutCSS.small}>
                        {`${errors.phone && touched.phone ? errors.phone : 'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს'}`}
                    </small>
                </div>
                <button type='submit'>submit</button>
            </Form>
        </div>
        <FormAboutCv formData={props.values}/>
    </div>
  )
}

export default FormAbout