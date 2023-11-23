
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { DataI } from '@/interfaces/Data';
import { GetServerSideProps } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';





export default function Home (data:DataI) { 
  const router = useRouter();
  

  useEffect(() => {
    router.query.error == "AccessDenied" && alert("usuario invalido")
  }, [])
  return (
    <>
    <Head>
      <title>agrojardines</title>
      <meta charSet="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="http://localhost:3000/agrojardinesLogo.jpg" />

<meta name="description" content={data.data.description} />

<meta property="og:type" content="website" />
<meta property="og:url" content="http://localhost:3000" />
<meta property="og:title" content="agrojardines" />
<meta property="og:description" content={data.data.description} />
<meta property="og:image" content="http://localhost:3000/agrojardinesLogo.jpg" />


<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="http://localhost:3000" />
<meta property="twitter:title" content="agrojardines" />
<meta property="twitter:description" content={data.data.description} />
<meta property="twitter:image" content="http://localhost:3000/agrojardinesLogo.jpg" />
    </Head>
        <Header/>
          <Hero  image={data.data.images[0].url} title={data.data.hero_title} />
          <Services data={data} />
          <Gallery data={data}/>
          <Contact data={data}/>
          <Footer/>
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
