import React from 'react'

const CustomError = ({message}) => {
  return (
    <p className='text-red-500 text-sm self-center text-center'>
        {message}
    </p>
  )
}

export default CustomError