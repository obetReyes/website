
import Image from 'next/image'
import agrojardinesLogo from "../../public/agrojardinesLogo.jpg"
import Link from 'next/link'
interface Props{
    title:string
    image:string
}

const Hero = ({title, image}:Props) => {
  return (
    <section className="relative bg-gradient-to-t from-black via-black to-transparent bg-no-repeat bg-cover" id='inicio' style={{backgroundImage:`linear-gradient(rgba(3, 3, 3, 0.55), rgba(3, 3, 3, 0.55)), url(${image})`}}>
      <article className="items-center w-full text-center py-24 mx-auto">
        <div className="p-10 text-center">
          <section>
            <h1 className="mt-32 text-2xl md:text-7xl tracking-tighter capitalize text-white font-semibold">
              <span className='text-orange-500'>{title?.substring(0, 4)}</span>
              {title?.substring(4)}
            </h1>
            <Image className='heroIcon rounded-full' width={128} height={128} src={agrojardinesLogo.src} alt='agrojardines logo' />
          </section>
          <section className="flex flex-col items-center justify-center gap-3 mt-10 md:flex-row">
            <Link href="/#contacto" className="px-6 py-2.5 md:px-8 md:py-3 text-center bg-orange-600 text-white shadow-md rounded-full">
              Contacto
            </Link>
            <Link href="/#trabajo" className="inline-flex items-center justify-center text-lg underline font-semibold text-white duration-200">
              Nuestro Trabajo
            </Link>
          </section>
        </div>
      </article>
    </section>

  )
}

export default Hero