import React from 'react'

import {useSession} from "next-auth/react"
import { signOut } from 'next-auth/react'


const header = 
"w-full bg-gray-100"

const nav = 
"w-10/12 m-4 mx-auto flex justify-center items-center"
const button = 
"p-4 bg-red-800 rounded text-white hover:bg-red-700"
const Appbar = () => {
  return (
    <header className={header}>
        <nav className={nav}>
            <button className={button} onClick={() => signOut({
                callbackUrl:"/"
            })} >cerrar sesion</button>
        </nav>
    </header>
  )
}

export default Appbar