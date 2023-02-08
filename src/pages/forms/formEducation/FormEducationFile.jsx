import {Formik} from 'formik';
import { useLocalStorageState } from '../hook';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import FormEducation from './FormEducationSingle/FormEducation'

const INITIAL_VALUES = {}

const validate = Yup.object({
  experiences: Yup.array()
    .of(
      Yup.object({})
    )
})

const LOCAL_STORAGE_KEY = 'react-redberry-form-data-education';

const FormExperienceFile = ({handleData, form}) => {
  const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    let newObject = {...values}
    console.log(newObject);
  }

  const newExpData = () => {
    initialValues.experiences.push({})
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
          initialValues={INITIAL_VALUES}
          {...props} 
      />}
      </Formik>
  </div>
)
}

export default FormExperienceFile
