import { FormDataI } from '@/interfaces/Form';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';


const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg";
  const fileClassname = 
  "hidden";
  const  divFileInputClasname = 
  "flex justify-evenly mb-4"
  const  labelClassName = 
  " p-4 bg-gray-900 text-white rounded shadow-lg cursor-pointer hover:bg-gray-800"


interface Props{
    service:string,
    description:string,
    inputs:{
        registerService: UseFormRegister<FormDataI>
        registerDescription:UseFormRegister<FormDataI>
        registerImage:UseFormRegister<FormDataI>
    }

}

  
const ServiceInput = ({service, description, inputs}:Props) => {
  return (
    <div className={divFileInputClasname}>
    <label>
          titulo:
      <input
        type="text"
        defaultValue={service}
        className={inputClassName}
        placeholder="agrojardines"
     {...inputs.registerService}
      />
    </label>

    <label>
          descripcion:
          <textarea
       
            defaultValue={description}
            className={inputClassName}
            placeholder="agrojardines"
            {...inputs.registerDescription}
          />

        </label>
    <label className={labelClassName}>
      imagen servicio
      <input
        type="file"
        className={fileClassname}
        {...inputs.registerImage}
      />
    </label>
  </div>
  )
}

export default ServiceInput