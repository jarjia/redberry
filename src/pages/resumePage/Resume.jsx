import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ResumeCSS from './resume.module.css'
import Vector from '../../assets/icons/Vector.png'
import mailIcon from '../../assets/icons/mail.png'
import phoneIcon from '../../assets/icons/phone.png'
import x from '../../assets/icons/x-vector.png'

const Resume = ({resumeForm}) => {
    const [btnClick, setBtnClick] = useState(0)

    const newPhone = `${resumeForm.phone_number.slice(0, 4)} ${resumeForm.phone_number.slice(4, 7)} ${resumeForm.phone_number.slice(7, 9)} ${resumeForm.phone_number.slice(9, 11)} ${resumeForm.phone_number.slice(11, 13)}`
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const savedBtn = JSON.parse(localStorage.getItem('react-click'))
        if(savedBtn) {
            setBtnClick(savedBtn)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('react-click', JSON.stringify(btnClick))
    }, [btnClick])

    return (
        <div className={ResumeCSS['resume-root']}>
            <Link to='/'><button className={ResumeCSS['home-back-btn']} onClick={() => localStorage.clear()}>
                <img src={Vector} alt='left arrow'/></button>
            </Link>
            <div className={ResumeCSS[`${btnClick < 1 ? 'successful-post' : 'successful-post-opacity'}`]}>
                <button onClick={() => setBtnClick(prev => prev + 1)}><img src={x} alt='x icon'/></button>
                <h3>რეზიუმე წარმატებით გაიგზავნა 🎉</h3>
            </div>
            <div className={ResumeCSS['resume-parent']}>
                <div className={ResumeCSS['resume']}>
                    <div className={ResumeCSS['profile']}>
                        <div className={ResumeCSS['profile-info']}>
                            <h2>{resumeForm.name} {resumeForm.surname}</h2>
                            <div className={ResumeCSS.mail}>
                                <img src={mailIcon} alt='mail icon'/>
                                <span>{resumeForm.email}</span>
                            </div>
                            <div className={ResumeCSS.phone}>
                                <img src={phoneIcon} alt='phone icon'/>
                                <span>{newPhone}</span>
                            </div>
                            <div className={ResumeCSS['about-me']}>
                                <h3>ჩემ შესახებ</h3>
                                <p>{resumeForm.about_me}</p>
                            </div>
                        </div>
                        <div className={ResumeCSS['profile-img']}>
                            <img src={`https://resume.redberryinternship.ge${resumeForm.image}`} alt='profile'/>
                        </div>
                    </div>
                    <div className={ResumeCSS['bottom-line']}></div>
                    <div className={ResumeCSS['show-list']}>
                        <h2>გამოცდილება</h2>
                        {resumeForm.experiences.map(item => {
                            return <div className={ResumeCSS['show-list-single']} key={item.id}>
                            <h3>{item.position}, {item.employer}</h3>
                            <small>{item.start_date} - {item.due_date}</small>
                            <p>{item.description}</p>
                        </div>
                        })}
                    </div>
                    <div className={ResumeCSS['bottom-line']}></div>
                    <div className={ResumeCSS['show-list']}>
                        <h2>განათლება</h2>
                        {resumeForm.educations.map(item => {
                            return <div className={ResumeCSS['show-list-single']} key={item.id}>
                            <h3>{item.institute}, {item.degree}</h3>
                            <small>{item.due_date}</small>
                            <p>{item.description}</p>
                        </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume