import mailIcon from '../../../../assets/icons/mail.png'
import phoneIcon from '../../../../assets/icons/phone.png'

const FormEducationCV = ({formData, degree, educations}) => {
  let newPhone = `${formData.phone_number.slice(0, 4)} ${formData.phone_number.slice(4, 7)} ${formData.phone_number.slice(7, 9)} ${formData.phone_number.slice(9, 11)} ${formData.phone_number.slice(11, 13)}`
  let isEducationEmpty = Object.values(educations[0]).every(x => x === null || x === '');

  return (
    <div>
      <div className='form-about-resume'>
        <div className='form-about-resume-info'>
          <h2>{formData.name} {formData.surname}</h2>
            <div className='mail'>
              <img src={mailIcon} alt='mail icon'/>
              <span>{formData.email}</span>
            </div>
            <div className='phone'>
              <img src={phoneIcon} alt='phone icon'/>
              <span>{newPhone}</span>
            </div>
            {formData.about_me.length > 0 &&<div className='about-me'>
              <h3>ჩემ შესახებ</h3>
              <p>{formData.about_me}</p>
            </div>}
          </div>
          <div className='form-about-resume-image'>
            <img src={formData.image} alt='profile'/>
          </div>
      </div>
      <div className='show-list'>
        <h2>გამოცდილება</h2>
        {formData.experiences.map(item => {
          let isEmpty = Object.values(item).every(x => x === null || x === '');
          return isEmpty !== true && <div className='single-show-list' key={formData.experiences.indexOf(item)}>
            <h3>{item.position.length > 0 && `${item.position},`} {item.employer}</h3>
            <small>{item.start_date.length > 0 && `${item.start_date.replace(/[/]/g, '-')} -`} {item.due_date.replace(/[/]/g, '-')}</small>
            <p>{item.description}</p>
          </div>
        })}
      </div>
      <div className='show-list'>
        {isEducationEmpty !== true && <h2>განათლება</h2>}
        {educations.map(item => {
          let degreeStr = ''
          degree && degree.map(prev => {
            if(prev.id === item.degree_id) {
              degreeStr = prev.title
            }
          })
          let isEmpty = Object.values(item).every(x => x === null || x === '');
          return isEmpty !== true && <div className='single-show-list' key={educations.indexOf(item)}>
            <h3>{item.institute.length > 0 && `${item.institute},`} {degreeStr}</h3>
            <small>{item.due_date.replace(/[/]/g, '-')}</small>
            <p>{item.description}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default FormEducationCV