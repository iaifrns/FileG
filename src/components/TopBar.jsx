import React from 'react'
import { image } from '../constants/image'
import { video } from '../constants/video'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
  const navigate = useNavigate()
  return (
    <div className='border p-1 flex justify-between items-center px-10'>
      <img alt='logo' src={image.logo1} className='w-[80px]' />
      <div className='flex justify-evenly w-[50%]'>
        <p className='menu-text' onClick={()=>navigate('/')}>Tableau de bord</p>
        <p className='menu-text'>Page de menu</p>
      </div>
      <video width={80} autoPlay muted playsInline={true} loop className='pointer-events-none'>
        <source src={video.welcomVideo} type='video/mp4' />
      </video>
    </div>
  )
}

export default TopBar
