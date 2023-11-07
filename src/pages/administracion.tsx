import Appbar from '@/components/Appbar'
import ImageInput from '@/components/ImageInput'
import Input from '@/components/Input'
import { FormDataI } from '@/interfaces/Form'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'


const submitInput = 
"bg-orange-700 p-4 rounded shadow-xl float-right"

const form=
"w-11/10 md:w-10/12 mx-auto border-2 border-blue-700 my-4 p-4 h-full"

const legend=
"text-4xl text-center m-2 font-semibold uppercase"

const image =
 "w-[50%] rounded shadow-lg"
const Administracion = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm<any>()


      const onSubmit = handleSubmit(async(data) => {
      try {
          console.log("data",data)
      } catch (error) {
        console.log("error",error)
      }
      
    })
  return (
    <>
    <Appbar/>
    <form className={form} onSubmit={onSubmit}>
    <legend className={legend}>Agrojardines</legend>
    <fieldset>
        <Input  label="descripcion del sitio web (lo que aparece en  google abajo del titulo de la pagina)" value='' register={register("description")} />
    </fieldset>
    <fieldset>
            <Input label='titulo inicio'  value='agrojardines'   register={register("hero_title")}/>
            <Input label='descripcion inicio'  value=''   register={register("hero_description")}/>
            <div>
            <ImageInput label="cambiar imagen fondo inicio"   register={register("hero_image")}  image='https://bsfreekib.nyc3.cdn.digitaloceanspaces.com/agrojardines/jardin_agrojardines_portada.jpg' />
       
            </div>
    </fieldset>
    <input type='submit' value="hacer cambios" className={submitInput} />
   </form>
    </>
  )
}

export default Administracion