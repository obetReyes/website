import { FormDataI } from '@/interfaces/Form';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Control, useWatch,} from 'react-hook-form';

  const fileInputClassname = 
  "hidden";
  const  labelClassName = 
  " p-4 bg-gray-900 text-white rounded shadow-lg cursor-pointer hover:bg-gray-800"
  const imageClassName =
  "rounded shadow-lg w-[50%] h-[40vh]"

interface Props{
    label:string
    register:any
    img:string

}
const ImageInput = ({img,label, register}:Props) => {

  return (
    <div  className="py-4 flex flex-col md:flex-row items-center justify-evenly">
  <label  className={labelClassName}>
    {label}
    <input
      type="file"
      className={fileInputClassname}
      {...register}
    />
</label>
<Image className={imageClassName}  src={img} width={400} height={400} alt='image'  />
</div>
  )
}

export default ImageInput