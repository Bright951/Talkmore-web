import React from 'react'

const Avatar = ({letter}) => {
  return (
    <div className='rounded-full ml-4 flex h-[50px] w-[50px] text-2xl items-center justify-center text-white bg-[#005fff]'>
        <p>{letter}</p>
    </div>
  )
}

export default Avatar