import {useState, useEffect} from 'react'
import { Field, Form, FieldArray, getIn } from 'formik';
import {MenuItem, Select} from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom'
import CustomizedSelectForFormik from './MUI/CustomSelect';
import FormEducationCV from './FormEducationCV';
import Vector from '../../../../assets/icons/Vector.png'
import success from '../../../../assets/icons/success.png'
import warning from '../../../../assets/icons/warning.png'

const FormEducation = ({errors, touched, handleSubmit, degree, form, newExpData, saveForm, ...props}) => {
  const [render, setRender] = useState(false)

  const navigate = useNavigate()

  const handleMultipleFields = () => {
    newExpData()
    setRender(true)
  }

  const handleSubmitEducation = () => {
    let emptyArr = []
    let newArr = props.values.educations.filter(item => {
      let isEmpty;
      isEmpty = Object.values(item).every(x => x === null || x === '');
      emptyArr.push(isEmpty)
      if(isEmpty && props.values.educations.length > 1) {
        return !item
      }else {
        return item
      }
    })
    if(emptyArr.find(item => item === true) && emptyArr.length > 1) {
      props.values.educations = newArr
    }    
    handleSubmit(newArr)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    setRender(false)
    saveForm(props.values)
  }, [props.values, saveForm]);

  return (
    <div className='form-parent'>
      <div className='form-div'>
        <Link to='/'><button className='home-back-btn' onClick={() => localStorage.clear()}><img src={Vector} alt='left arrow'/></button></Link>
        <header className='form-header'>
          <h2>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>
          <span>3/3</span>
        </header>
        <Form className='form'>
          <FieldArray
            name='educations'
            validateOnChange
            render={arr => {
              return <div>
                {props.values.educations && props.values.educations.length > 0 && (
                  props.values.educations.map((prop, index) => {
                    const FieldErrors = getIn(errors, `educations[${index}]`)
                    const FieldTouched = getIn(touched, `educations[${index}]`)
                    return <div key={index}>
                      <div className='field-parent'>
                        <div className='single-input'>
                          <label htmlFor={`educations[${index}].institute`} 
                          className={FieldErrors?.institute && FieldTouched?.institute && 'label-red'}>სასწავლებელი</label>
                          <div>
                            <Field type='text' name={`educations[${index}].institute`} placeholder='სასწავლებელი' 
                            className={`text-input ${(FieldErrors?.institute && FieldTouched?.institute && 'text-input-red') 
                            || (!FieldErrors?.institute && prop.institute.length > 1 && 'text-input-green')}`}/>
                            {!FieldErrors?.institute && prop.institute.length > 1 && <img src={success} alt='success icon' className='success'/>}
                            {FieldErrors?.institute && FieldTouched?.institute && <img src={warning} alt='warning icon' className='warning'/>}
                          </div>
                          <small className='small'>
                            {FieldErrors?.institute && FieldTouched?.institute ? FieldErrors?.institute : 'მინიმუმ 2 სიმბოლო'}
                          </small>
                        </div>
                        <div className='fulldate-div'>
                          <div className='single-input'>
                            <label htmlFor={`educations[${index}].degree_id`}
                            className={FieldErrors?.degree_id && FieldTouched?.degree_id && 'label-red'}>ხარისხი</label>
                            <div>
                              <Field name={`educations[${index}].degree_id`} component={CustomizedSelectForFormik} 
                               className={`text-input ${(FieldErrors?.degree_id && FieldTouched?.degree_id && 'text-input-red') 
                               || (!FieldErrors?.degree_id && prop.degree_id.length > 0 && 'text-input-green')}`}>
                                {degree !== null && <MenuItem value='' disabled defaultValue>აირჩიეთ ხარისხი</MenuItem>}
                                {degree !== null && degree.map(deg => {
                                  return <MenuItem key={deg.id} value={deg.id}>{deg.title}</MenuItem>
                                })}
                              </Field>
                              {!FieldErrors?.degree_id && prop.degree_id !== '' && <img src={success} alt='success icon' className='success-select'/>}
                              {FieldErrors?.degree_id && FieldTouched?.degree_id && <img src={warning} alt='warning icon' className='warning-select'/>}
                            </div>
                            </div>
                            <div className='single-input'>
                              <label htmlFor={`educations[${index}].due_date`}
                              className={FieldErrors?.due_date && FieldTouched?.due_date && 'label-red'}>დამთავრების რიცხვი</label>
                              <div>
                                <Field type='date' name={`educations[${index}].due_date`} 
                                className={`text-input ${(FieldErrors?.due_date && FieldTouched?.due_date && 'text-input-red') 
                                || (!FieldErrors?.due_date && prop.due_date.length > 1 && 'text-input-green')}`}/>
                                {!FieldErrors?.due_date && prop.due_date.length > 1 && <img src={success} alt='success icon' className='success-right'/>}
                                {FieldErrors?.due_date && FieldTouched?.due_date && <img src={warning} alt='warning icon' className='warning'/>}                                  
                              </div>
                            </div>
                          </div>
                            <div className='single-input'>
                              <label htmlFor={`educations[${index}].description`}
                              className={FieldErrors?.description && FieldTouched?.description && 'label-red'}>აღწერა</label>
                              <div>
                              <Field as='textarea' name={`educations[${index}].description`} placeholder='განათლების აღწერა' 
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
            }}
          />
          <div className='btn-group'>
            <button type='button' className='add-btn' onClick={handleMultipleFields}>სხვა სასწავლებლის დამატება</button>
            <div>
              <button type='button' className='back-btn' onClick={() => navigate('/formExperience')}>ᲣᲙᲐᲜ</button>
              <button type='button' className='next-btn' onClick={handleSubmitEducation}>ᲓᲐᲡᲠᲣᲚᲔᲑᲐ</button>
            </div>
          </div>
        </Form>
      </div>
      <FormEducationCV formData={form} degree={degree} educations={props.values.educations}/>
    </div>
  )
}

export default FormEducation