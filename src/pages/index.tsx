
import Hero from '@/components/Hero';
import { DataI } from '@/interfaces/Data';
import { GetStaticProps } from 'next';
import { Inter } from 'next/font/google'
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] })


export const getStaticProps = (async (context) => {
  const res = await fetch(`http://localhost:3000/api/website`)
  const data = await res.json()
  return { props: { data } }
}) satisfies GetStaticProps<{
  data: DataI
}>
 

export default function Home (data:DataI) { 

  return (
    <Suspense fallback={<p>cargando datos...</p>}>
  
          <Hero  image={data.data.images[0].url} title={data.data.hero_title} />
  </Suspense>
    
  )
}