import React from 'react'
import { signIn } from 'next-auth/react'

const Ingreso = () => {
  return (
    <section className='w-full h-screen flex flex-col justify-center items-center'>
    <button className='bg-orange text-dark p-4 rounded-md font-semibold text-lg shadow-lg' onClick={() => signIn()} >Ingresar</button>
    </section>
  )
}

export default Ingreso





