import React from 'react'

const Post = ({blogs}) => {
  

  return (
    <div className=' flex gap-4 mb-3 mt-7 px-[3px] md:px-7 border-2 p-4 rounded-md md:mx-2  '>
      <img className= ' w-[37%] md:w-[25%] h-[27vh]  md:h-[40vh]     ' src={blogs.photo} alt="" />
      <div>
        <h1 className='text-2xl mb-2  font-bold'>{blogs?.title.length >50 ? blogs?.title.substring(0, 50) + '..' :blogs?.title} </h1>
        <div className='flex items-center  justify-between space-x-8 md:space-x-96 '>
        <h1 className=' font-semibold mb-2'>@{blogs?.userId?.username}</h1>
        <div className='flex mb-2 gap-4'>
        <p>{new Date(blogs.createdAt).toString().slice(0,15)}</p>
       <p className='hidden md:block'>{new Date(blogs.createdAt).toString().slice(16,24)}</p>
        </div>
        </div>
        <p className=' w-[100%]'>{blogs?.description.length >50 ? blogs?.description.substring(0, 50) + '..' :blogs?.description} </p>
      </div>
    </div>
  )
}

export default Post
