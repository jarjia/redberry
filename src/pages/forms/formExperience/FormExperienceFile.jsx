import {Formik} from 'formik';
import { useLocalStorageState } from '../hook';
import { useNavigate } from 'react-router-dom'
import FormExperience from './formExperienceSingle/FormExperience'
import * as Yup from 'yup';

const INITIAL_VALUES = {
  experiences: [
    {
      position: '',
      employer: '',
      start_date: '',
      due_date: '',
      description: ''
    }
  ]
}

const validate = Yup.object({
  experiences: Yup.array()
    .of(
      Yup.object({
        position: Yup.string()
          .min(2, 'უნდა იყოს 2 ან მეტი ასო')
          .required('გთხოვთ შეავსოთ'),
        employer: Yup.string()
          .min(2, 'უნდა იყოს 2 ან მეტი ასო')
          .required('გთხოვთ შეავსოთ'),
        start_date: Yup.string()
          .required('გთხოვთ შეავსოთ'),
        due_date: Yup.string()
          .required('გთხოვთ შეავსოთ'),
        description: Yup.string()
          .required('გთხოვთ შეავსოთ')
      })
    )
})

const LOCAL_STORAGE_KEY = 'react-redberry-form-data-experience';

const FormExperienceFile = ({handleData, form}) => {
  const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    let newObject = {...values}
    console.log(newObject);
    handleUpdateForm(newObject)
    navigate('/formEducation')
    handleData(newObject)
  }

  const newExpData = () => {
    initialValues.experiences.push({
      position: '',
      employer: '',
      start_date: '',
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
      {(props, errors, touched) => <FormExperience
          form={form}  
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

export default FormExperienceFile
