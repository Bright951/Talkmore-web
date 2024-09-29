import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { GrGallery } from "react-icons/gr";
import { useAuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { createPost } from '../lib/appwriteFunctions';

const PostForm = () => {
    const [caption, setCaption] = useState('')
    const [location, setLocation] = useState('')
    const [tag, setTag] = useState('')
    const [fileUrl, setFileUrl] = useState(null)
    const [files, setFiles] = useState([])

    const { user } = useAuthContext()

    const reset = () => {
        setCaption('')
        setLocation('')
        setTag('')
        setFiles(null)
        setFileUrl(null)
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    })

    const submitForm = async (e) => {
        e.preventDefault()

        const postDetails = {
            user_id: user.$id,
            desc: caption,
            tag: tag,
            location: location,
            files: files
        }
        try {
            const post = await createPost(postDetails)
            console.log(post)
            reset()  
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    return (
        <div className='w-full h-full'>
            <form className='flex flex-col gap-6' onSubmit={submitForm}>
                <textarea 
                    placeholder='Caption or Title' 
                    className='p-2 font-bold text-blue-500 placeholder-gray-700 bg-gray-600 rounded-md bg-opacity-10 focus:ring-2 focus:ring-blue-500 focus:outline-none' 
                    rows={8} 
                    cols={20}  
                    value={caption}
                    onChange={(e)=> setCaption(e.target.value) }
                    autoFocus={true}
                />
                <div {...getRootProps()} className='flex flex-center flex-col w-full h-[12rem] rounded-xl cursor-pointer'>
                    <input {...getInputProps()} />
                    {
                        fileUrl ? (
                            <div className='flex flex-col w-full h-full'>
                                <div className="flex flex-col items-center justify-center w-full h-full p-2 bg-gray-600 rounded-md bg-opacity-10">
                                    <img
                                        src={fileUrl}
                                        alt='file preview'
                                        className='object-contain w-full rounded-md h-4/5'
                                    />
                                    <p className='font-bold text-center p-[3px]'>
                                        Click or drag and drop a photo to change
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center w-full h-full bg-gray-600 rounded-md bg-opacity-10'>
                                <GrGallery fontSize={45} />
                                <div className="flex flex-col items-center p-2">
                                    <h2 className='font-bold'>Drag and drop your file here.</h2>
                                    <p className=''>SVG, PNG, JPG</p>
                                </div>
                                <div className='bg-gray-600 bg-opacity-30 p-[0.5rem] rounded-md'>
                                    Select from computer
                                </div> 
                            </div>
                        )
                    }
                </div>
                <input 
                    type="text" 
                    placeholder='location e.g Abuja, Nigeria'
                    className='p-2 font-bold text-blue-500 placeholder-gray-700 bg-gray-600 rounded-md bg-opacity-10 focus:ring-2 focus:ring-blue-500 focus:outline-none' 
                    value={location}
                    onChange={(e)=> setLocation(e.target.value) }
                />
                <input 
                    type="text" 
                    placeholder='tag e.g Coding, React, JS.'
                    className='p-2 font-bold text-blue-500 placeholder-gray-700 bg-gray-600 rounded-md bg-opacity-10 focus:ring-2 focus:ring-blue-500 focus:outline-none' 
                    value={tag}
                    onChange={(e)=> setTag(e.target.value) }
                />

                <div className="flex">
                    <input 
                        type="submit"
                        className='w-[45%] ml-[5%] h-[40px] bg-blue-700 text-white rounded-md cursor-pointer'
                    />
                    <div 
                        className='w-[45%] ml-[5%] h-[40px] bg-blue-700 text-white rounded-md cursor-pointer'
                        onClick={reset}
                    >
                        Reset
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm
