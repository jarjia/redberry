import {Formik} from 'formik';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useLocalStorageState } from '../hook';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import FormEducation from './FormEducationSingle/FormEducation'

const INITIAL_VALUES = {
  educations: [
    {
      institute: '',
      degree_id: '',
      due_date: '',
      description: ''
    }
  ]
}

const validate = Yup.object({
  educations: Yup.array()
    .of(
      Yup.object({
        institute: Yup.string()
          .min(2, 'უნდა იყოს 2 ან მეტი ასო')
          .required('გთხოვთ შეავსოთ'),
        degree_id: Yup.string()
          .required('გთხოვთ შეავსოთ'),
        due_date: Yup.string()
          .required('გთხოვთ შეავსოთ'),
        description: Yup.string()
          .required('გთხოვთ შეავსოთ'),
      })
    )
})

const LOCAL_STORAGE_KEY = 'react-redberry-form-data-education';

const FormEducationFile = ({handleResumeData, handleResetForm, form}) => {
  const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });
  const [degree, setDegree] = useState(null)

  useEffect(() => {
    axios.get('https://resume.redberryinternship.ge/api/degrees')
      .then(res => setDegree(res.data))
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()

  const postResume = async (data) => {
    try {
      await axios.post('https://resume.redberryinternship.ge/api/cvs', data, 
      {headers: {'Content-Type': 'multipart/form-data',}}, {})
      .then(res => {
        if(res.status === 201) {
          handleResumeData(res.data)
          localStorage.clear()
          navigate('/resume')
          handleResetForm()
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (values) => {
    let newObject = {...values}
    let fullForm = Object.assign(form, newObject)
    handleUpdateForm(newObject)
    fetch(fullForm.image)
    .then(res => res.blob())
    .then(blob => {
      fullForm.image = new File([blob], "file name", { type: "image/png" })
    })
    fullForm.educations = fullForm.educations.map(item => {
      return {...item, due_date: item.due_date.replace(/-/g, '/')}
    })
    setTimeout(() => {
      postResume(fullForm)
    }, 100)
  }

  const newExpData = () => {
    initialValues.educations.push({
      institute: '',
      degree_id: '',
      due_date: '',
      description: ''
    })
  }

return (
  <div className='form-1-main'>
      <Formik 
          enableReinitialize
          initialValues={initialValues} 
          validationSchema={validate}
          onSubmit={handleSubmit}
      >
      {(props, errors, touched) => <FormEducation
          form={form}  
          degree={degree}
          errors={errors} 
          touched={touched} 
          saveForm={handleUpdateForm}
          newExpData={newExpData}
          handleSubmit={handleSubmit}
          initialValues={INITIAL_VALUES}
          {...props} 
      />}
      </Formik>
  </div>
)
}

export default FormEducationFile
