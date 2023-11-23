import { FormDataI } from '@/interfaces/Form'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'


const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg min-h-[20vh]";

const labelClassName = 
    "text-xl font-semibold uppercase"


interface Props{
    value:string
    label:string,
    register:any
}

const Input = ({register, label, value}:Props) => {
  return (
    <div >
    <label className={labelClassName}>
            {label}
      </label>
      <textarea
    
        defaultValue={value}
        {...register}
        className={inputClassName}
  
    >  
      </textarea>
    
  </div>
  )
}

export default Input