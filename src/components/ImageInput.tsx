import { FormDataI } from '@/interfaces/Form';
import Image from 'next/image';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';


  const fileInputClassname = 
  "hidden";
  const  labelClassName = 
  " p-4 bg-gray-900 text-white rounded shadow-lg cursor-pointer hover:bg-gray-800"
  const image =
  "w-[50%] rounded shadow-lg"

interface Props{
    label:string
    register:any
    image:string

}
const ImageInput = ({label, register, image}:Props) => {
  return (
    <div className="py-4 flex flex-col md:flex-row items-center justify-evenly">
  <label className={labelClassName}>
    {label}
    <input
      type="file"
      className={fileInputClassname}
      {...register}
    />
</label>
<Image className={image}  src={image} width={400} height={400} alt='image'  />
</div>
  )
}

export default ImageInput