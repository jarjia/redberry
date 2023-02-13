import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImage from '../assets/home/404-image.jpg'

const ErrorPage = () => {
  return (
    <div className='error-page'>
        <img src={ErrorImage} alt='error'/>
        <h1>Ooops... Something went wrong!<br></br> 404 page</h1>
        <h2>Seems like you tried to access page that doesn't exist...</h2>
        <h3><Link to='/'>Go back to home page</Link></h3>
    </div>
  )
}

export default ErrorPage