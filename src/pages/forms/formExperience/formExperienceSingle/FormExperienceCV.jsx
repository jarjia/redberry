import mailIcon from '../../../../assets/icons/mail.png'
import phoneIcon from '../../../../assets/icons/phone.png'

const FormExperienceCV = ({formData, experiences}) => {
  let newPhone = `${formData.phone_number.slice(0, 4)} ${formData.phone_number.slice(4, 7)} ${formData.phone_number.slice(7, 9)} ${formData.phone_number.slice(9, 11)} ${formData.phone_number.slice(11, 13)}`
  let isExperienceEmpty = Object.values(experiences[0]).every(x => x === null || x === '');

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
            <div className='about-me'>
              <h3>ჩემ შესახებ</h3>
              <p>{formData.about_me}</p>
            </div>
          </div>
          <div className='form-about-resume-image'>
            <img src={formData.image} alt='profile'/>
          </div>
      </div>
      <div className='show-list'>
        {isExperienceEmpty !== true && <h2>გამოცდილება</h2>}
        {experiences.map(item => {
          let isEmpty = Object.values(item).every(x => x === null || x === '');
          return isEmpty !== true && <div className='single-show-list' key={experiences.indexOf(item)}>
            <h3>{item.position.length > 0 && `${item.position},`} {item.employer}</h3>
            <small>{item.start_date.length > 0 && `${item.start_date.replace(/[/]/g, '-')} -`} {item.due_date.replace(/[/]/g, '-')}</small>
            <p>{item.description}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default FormExperienceCV