import {Formik} from 'formik';
import FormAbout from './formAboutSingle/FormAbout';
import { useLocalStorageState } from '../hook';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

const INITIAL_VALUES = {
    name: '',
    surname: '',
    image: '',
    about_me: '',
    email: '',
    phone_number: ''
};

const georgianRegex = /[\u10A0-\u10FF]/;
const georgianPhoneRegex = /^(\+?995)?(79\d{7}|5\d{8})$/;

const validate = Yup.object({
    name: Yup.string()
      .min(2, 'უნდა იყოს 2 ან მეტი ასო')
      .matches(georgianRegex, 'გამოიყენე ქართული ასოები')
      .required('გთხოვთ შეავსოთ'),
    surname: Yup.string()
      .min(2, 'უნდა იყოს 2 ან მეტი ასო') 
      .matches(georgianRegex, 'გამოიყენე ქართული ასოები') 
      .required('გთხოვთ შეავსოთ'),
    image: Yup.string()
      .required('გთხოვთ ატვირთოთ ფოტო'),
    about_me: Yup.string()
      .notRequired(),
    email: Yup.string()
      .email('მეილი არასწორია')
      .matches('@redberry.ge', 'უნდა მთავრდებოდეს @redberry.ge-ით')
      .required('გთხოვთ მიუთითოთ მეილი'),
    phone_number: Yup.string()
      .matches(georgianPhoneRegex, 'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს')
      .required('გთხოვთ შეავსოთ')
    
})

const LOCAL_STORAGE_KEY = 'react-redberry-form-data-about';

const FormAboutFile = ({handleData}) => { 
    const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });

    const navigate = useNavigate()

    const handleSubmit = (values) => {
      let newObject = {...values}
      console.log(newObject)
      handleData(newObject)
      navigate('/formExperience')
    }

  return (
    <div className='form-1-main'>
        <Formik 
            enableReinitialize
            initialValues={initialValues} 
            validationSchema={validate}
            onSubmit={handleSubmit}
        >
        {(props, errors, touched) =>  <FormAbout 
            errors={errors} 
            touched={touched} 
            saveForm={handleUpdateForm} 
            {...props} 
        />}
        </Formik>
    </div>
  )
}

export default FormAboutFile