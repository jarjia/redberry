import {Formik} from 'formik';
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
        degree_id: Yup.number()
          .required('გთხოვთ შეავსოთ'),
        due_date: Yup.string()
          .required('გთხოვთ შეავსოთ'),
        description: Yup.string()
          .required('გთხოვთ შეავსოთ'),
      })
    )
})

const LOCAL_STORAGE_KEY = 'react-redberry-form-data-education';

const FormEducationFile = ({handleData, form}) => {
  const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    let newObject = {...values}
    console.log(newObject);
    handleData(newObject)
    handleUpdateForm(newObject)
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
