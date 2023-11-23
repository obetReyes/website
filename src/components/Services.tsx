import { DataI } from "@/interfaces/Data";
import Link from "next/link";
import Image from "next/image";
interface Props{
    data:DataI
}
const Services = ({data}:Props) => {
    const lastSpace = data.data?.services_title?.lastIndexOf(" ");
    const servicesTitle = data.data?.services_title?.split(" ")
    if(data)
    return (
     <section className="py-10  " id="servicios">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2" >
              <div>
                <h1 className="text-2xl  font-bold text-black sm:text-6xl lg:text-4xl">
                {data.data?.services_title?.substring(0, lastSpace)}
                  
                  <div className="relative ml-4  inline-flex">
                    <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#71BF11]"></span>
                    <p className="relative text-2xl font-bold text-black sm:text-6xl lg:text-4xl">
                     {servicesTitle?.pop()}
                    </p>
                  </div>
                </h1>
                <p className="mt-8 text-base text-black sm:text-xl">
                    {data.data.services_description}
                </p>
                <div className="mt-10 flex items-center gap-5 md:gap-0 sm:flex sm:items-center sm:space-x-8">
                  <Link
                    href="#contacto"
                    
                    className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold transition-all duration-200 bg-[#2971D9] hover:opacity-90"
                    role="button"
                  >
                    Contacto
                  </Link>
                
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <Image
                  className="w-[70%]"
                  src={data.data.images[1].url}
                  alt={data.data.images[1].url.split("agrojardines/"[1])+ "imagen"}
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
          <section className='px-5 lg:px-16'  >
                <div className=" items-center w-full  py-12 mx-auto  max-w-7xl">
                  <div >
                  <ul className="grid grid-cols-2 col-span-2 gap-4 lg:grid-cols-3">
                    {data.data.services.map((service) => {
                      return (
                        <li className='relative cursor-pointer' key={service.name}>
                        <Link href={`servicios/${service.name}`} >

<figure>
 <Image className="w-full h-[300px]  object-cover brightness-50 hover:brightness-75" src={service.images[0].url} alt="" width="1310" height="873"/>
 <figcaption className='absolute   top-1/2 inset-x-0 z-30 flex justify-center text-center text-base text-white font-semibold sm:text-xl'>{service.name}</figcaption>
</figure>
</Link>
                        </li>
                      )
                    })
                    }
                     </ul> 
                  </div>
                </div>
              </section> 
  
               
        </section>
    )
  }

export default Services;