import React from 'react'

const Avatar = ({letter, fs}) => {
  return (
    <div className={`rounded-full flex h-full w-full font-bold text-${fs} items-center justify-center text-white bg-[#005fff]`}>
        <p>{letter}</p>
    </div>
  )
}

export default Avatar