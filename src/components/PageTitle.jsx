import React from 'react'

const PageTitle = ({page, title}) => {
  return (
    <div className='flex flex-col'>
        <div className='flex gap-2 text-sm font-semibold'>
            <p>{page}</p>
            <p>/</p>
            <p className='text-secondary'>{title}</p>
        </div>
        <p className='text-2xl font-semibold'>Bienvenue sur {page}</p>
    </div>
  )
}

export default PageTitle
