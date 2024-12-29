import React from 'react'

const Input = ({icon:Icon,...props}) => {
  return (
    <div className='relative mb-6'>
       <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
        <Icon className="text-green-500 size-5"/>
       </div>
       <input {...props} className='w-full pr-3 py-2 bg-gray-800 opacity-50 rounded-lg 
        border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white
         placeholder-gray-400 transition duration-200 pl-10' />
    </div>
  )
}

export default Input