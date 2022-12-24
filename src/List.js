import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({item, handleRemove, handleChange, id}) => {
  return ( 
    <article className='flex justify-between mt-2'>
      <p className='tracking-wider pl-2 capitalize'>{item}</p>
      <div className="btn-container flex justify-between">
        <FaEdit className='mr-3 text-green-500 cursor-pointer' onClick={()=>handleChange(id)}/>
        <FaTrash className='mr-3 text-red-500 cursor-pointer' onClick={()=>handleRemove(id)}/>
      </div>
    </article>
  )
}

export default List