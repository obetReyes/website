import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ServiceDataI, ServiceI } from '@/interfaces/Data';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const getServerSideProps = (async (context) => {
    const { params } = context;
    const servicio = params?.servicio as string;
  
    const res = await fetch(`http://localhost:3000/api/website/${servicio}`);
    const data = await res.json();
    return { props: { data, servicio } };
  }) satisfies GetServerSideProps<{
    data: ServiceDataI;
  }>;
  
const Servicio = (data:ServiceDataI) => {
 
	const router = useRouter()
	console.log(router.asPath.split("servicios/")[1])
  return (
	<>
	
	<Head>
	<title>agrojardines {router.query.servicio}</title>
	<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="http://localhost:3000/agrojardinesLogo.jpg" />

<meta name="description" content={data.data.description} />

<meta property="og:type" content="website" />
<meta property="og:url" content={`http://localhost:3000/servicios/${router.asPath.split("/servicios"[1])}`} />
<meta property="og:title" content="agrojardines" />
<meta property="og:description" content={data.data.description} />
<meta property="og:image" content="http://localhost:3000/agrojardinesLogo.jpg" />


<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={`http://localhost:3000/servicios/${router.asPath.split("/servicios"[1])}`} />
<meta property="twitter:title" content="agrojardines" />
<meta property="twitter:description" content={data.data.description} />
<meta property="twitter:image" content="http://localhost:3000/agrojardinesLogo.jpg" />
  </Head>
    <section className='overflow-hidden'>
        <Header color='bg-[#2971D9]'/>
        
        <div className='mt-24'>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2" >
		  <div>
			<h1 className="text-2xl  font-bold text-black sm:text-6xl lg:text-4xl">

			  <div className="relative ml-4 inline-flex">
				<span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#71BF11]"></span>
				<p className="relative text-2xl font-bold text-black sm:text-6xl lg:text-4xl">
				 {data.data.name}
				</p>
			  </div>
			</h1>
			<p className="mt-8 text-base text-black sm:text-xl">
			  {data.data.description}
			</p>
			<div className="mt-10 flex items-center gap-5 md:gap-0 sm:flex sm:items-center sm:space-x-8">
			  <Link
				href="/#contacto"
			
				className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-700 hover:bg-orange-600 focus:bg-orange-600"
		
			  >
				Contacto
			  </Link>
			
			</div>
		  </div>
		  <div className="flex justify-center md:justify-end ">
			<Image
			 className=" w-[70%] lg:w-[100%] min-h-[50vh]"
			  src={data.data.images[0].url}
			  alt={`${data.data.name} imagen`}
				width={400}
				height={400}
			/>
		  </div>
		</div>
	  </div>
        </div>
        <Footer/>
    </section>
	</>
  )
}

export default Servicio