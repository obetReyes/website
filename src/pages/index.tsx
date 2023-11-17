
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { DataI } from '@/interfaces/Data';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Inter } from 'next/font/google'
import { Suspense } from 'react';




export default function Home (data:DataI) { 
  
  return (
    <>
        <Header/>
          <Hero  image={data.data.images[0].url} title={data.data.hero_title} />
          <Services data={data} />
    </>
      
  )
}




export const getServerSideProps = (async (context) => {
    const res = await fetch(`http://localhost:3000/api/website`);
    const data = await res.json();
    return { props: { data } };
 
}) satisfies GetServerSideProps<{
  data: DataI
}>
