import {useState, useEffect} from 'react'
import { Field, Form, FieldArray, getIn } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import Vector from '../../../../assets/icons/Vector.png'
import success from '../../../../assets/icons/success.png'
import warning from '../../../../assets/icons/warning.png'
import FormExperienceCV from './FormExperienceCV';

const FormExperience = ({errors, touched, newExpData, saveForm, form, handleSubmit, ...props}) => {
  const [state, setState] = useState(false)

  const navigate = useNavigate()

  const handleMultipleFields = () => {
    setState(true)
    newExpData()
  }

  const handleSubmitExperience = () => {
    let emptyArr = []
    let newArr = props.values.experiences.filter(item => {
      let isEmpty;
      isEmpty = Object.values(item).every(x => x === null || x === '');
      emptyArr.push(isEmpty)
      if(isEmpty) {
        return !item
      }else {
        return item
      }
    })
    if(emptyArr.find(item => item === true)) {
      props.values.experiences = newArr
    }    
    handleSubmit(newArr)
  }

  useEffect(() => {
    setState(false)
    saveForm(props.values)
  }, [props.values, saveForm, state]);

  console.log(props.values);

  return (
    <div className='form-parent'>
        <div className='form-div'>
            <Link to='/'><button className='home-back-btn' onClick={() => localStorage.clear('react-redberry-data')}><img src={Vector} alt='left arrow'/></button></Link>
            <header className='form-header'>
                <h2>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h2>
                <span>2/3</span>
            </header>
            <Form className='form'>
              {/* <div className='single-input'>
                className={errors.firstName && touched.firstName && 'label-red'}
                  <label htmlFor='experiences[0].position'>თანამდებობა</label>
                  <div>
                    <Field type='text' name='experiences[0].position' placeholder='დეველოპერი, დიზაინერი, ა.შ.' className='text-input' />
                    ${(errors.firstName && touched.firstName && 'text-input-red') 
                    || (!errors.firstName && props.values.firstName.length > 0 && 'text-input-green')}`} autoComplete="new-password"/>
                    {!errors.firstName && props.values.firstName.length > 0 && <img src={success} alt='success icon' className='success'/>}
                    {errors.firstName && touched.firstName && <img src={warning} alt='warning icon' className='warning'/>}
                  </div>
                  <small className='small'>
                    {`${errors.firstName && touched.firstName ? errors.firstName : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'}`}
                  </small>
                </div> */}
                <FieldArray
                  name='experiences'
                  validateOnChange
                  render={arr => {
                  return (<div>
                      {props.values.experiences && props.values.experiences.length > 0 && (
                        props.values.experiences.map((prop, index) => {
                          let FieldErrors = getIn(errors, `experiences[${index}]`)
                          let FieldTouched = getIn(touched, `experiences[${index}]`)
                          console.log(FieldErrors);
                          console.log(prop);
                          return <div key={index}>
                            <div className='field-parent'>
                              <div className='single-input'>
                                <label htmlFor={`experiences[${index}].position`} 
                                className={FieldErrors?.position && FieldTouched?.position && 'label-red'}>თანამდებობა</label>
                                <div>
                                  <Field type='text' name={`experiences[${index}].position`} placeholder='დეველოპერი, დიზაინერი, ა.შ.' 
                                  className={`text-input ${(FieldErrors?.position && FieldTouched?.position && 'text-input-red') 
                                  || (!FieldErrors?.position && prop.position.length > 1 && 'text-input-green')}`}/>
                                  {!FieldErrors?.position && prop.position.length > 1 && <img src={success} alt='success icon' className='success'/>}
                                  {FieldErrors?.position && FieldTouched?.position && <img src={warning} alt='warning icon' className='warning'/>}
                                </div>
                                <small className='small'>
                                  {FieldErrors?.position && FieldTouched?.position ? FieldErrors?.position : 'მინიმუმ 2 სიმბოლო'}
                                </small>
                              </div>
                              <div className='single-input'>
                                <label htmlFor={`experiences[${index}].employer`} 
                                 className={FieldErrors?.employer && FieldTouched?.employer && 'label-red'}>დამსაქმებელი</label>
                                <div>
                                  <Field type='text' name={`experiences[${index}].employer`} placeholder='დამსაქმებელი' 
                                  className={`text-input ${(FieldErrors?.employer && FieldTouched?.employer && 'text-input-red') 
                                  || (!FieldErrors?.employer && prop.employer.length > 1 && 'text-input-green')}`}/>
                                  {!FieldErrors?.employer && prop.employer.length > 1 && <img src={success} alt='success icon' className='success'/>}
                                  {FieldErrors?.employer && FieldTouched?.employer && <img src={warning} alt='warning icon' className='warning'/>}
                                </div>
                                <small className='small'>
                                  {FieldErrors?.employer && FieldTouched?.employer ? FieldErrors?.employer : 'მინიმუმ 2 სიმბოლო'}
                                </small>
                              </div> 
                              <div className='fulldate-div'>
                                <div className='single-input'>
                                  <label htmlFor={`experiences[${index}].start_date`}
                                  className={FieldErrors?.start_date && FieldTouched?.start_date && 'label-red'}>დაწყების რიცხვი</label>
                                  <div>
                                    <Field type='date' name={`experiences[${index}].start_date`} 
                                    className={`text-input ${(FieldErrors?.start_date && FieldTouched?.start_date && 'text-input-red') 
                                    || (!FieldErrors?.start_date && prop.start_date.length > 1 && 'text-input-green')}`}/>
                                    {!FieldErrors?.start_date && prop.start_date.length > 1 && <img src={success} alt='success icon' className='success-right'/>}
                                    {FieldErrors?.start_date && FieldTouched?.start_date && <img src={warning} alt='warning icon' className='warning'/>}
                                  </div>
                                </div>
                                <div className='single-input'>
                                  <label htmlFor={`experiences[${index}].due_date`}
                                  className={FieldErrors?.due_date && FieldTouched?.due_date && 'label-red'}>დამთავრების რიცხვი</label>
                                  <div>
                                    <Field type='date' name={`experiences[${index}].due_date`} 
                                    className={`text-input ${(FieldErrors?.due_date && FieldTouched?.due_date && 'text-input-red') 
                                    || (!FieldErrors?.due_date && prop.due_date.length > 1 && 'text-input-green')}`}/>
                                    {!FieldErrors?.due_date && prop.due_date.length > 1 && <img src={success} alt='success icon' className='success-right'/>}
                                    {FieldErrors?.due_date && FieldTouched?.due_date && <img src={warning} alt='warning icon' className='warning'/>}                                  
                                  </div>
                                </div>
                              </div>
                              <div className='single-input'>
                                <label htmlFor={`experiences[${index}].description`}
                                className={FieldErrors?.description && FieldTouched?.description && 'label-red'}>აღწერა</label>
                                <div>
                                  <Field as='textarea' name={`experiences[${index}].description`} placeholder='როლი თანამდებობაზე და ზოგადი აღწერა' 
                                  className={`text-input-textarea ${(FieldErrors?.description && FieldTouched?.description && 'text-input-red') 
                                  || (!FieldErrors?.description && prop.description.length > 0 && 'text-input-green')}`}/>
                                  {!FieldErrors?.description && prop.description.length > 0 && <img src={success} alt='success icon' className='success-right'/>}
                                  {FieldErrors?.description && FieldTouched?.description && <img src={warning} alt='warning icon' className='warning'/>}
                                </div>
                              </div>
                            </div>
                            <div className="bottom-line"></div>
                          </div> 
                        })
                      )}
                    </div>
                  )}}
                />
                <div className='btn-group'>
                  <button type='button' onClick={handleMultipleFields} className='add-btn'>მეტი გამოცდილების დამატება</button>
                  <div>
                    <button type='button' className='back-btn' onClick={() => navigate('/formAbout')}>ᲣᲙᲐᲜ</button>
                    <button type='button' className='next-btn' onClick={handleSubmitExperience}>ᲨᲔᲛᲓᲔᲒᲘ</button>
                  </div>
                </div>
            </Form>
        </div>
        <FormExperienceCV experiences={props.values.experiences} formData={form}/>
    </div>
  )
}

export default FormExperience