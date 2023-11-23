import { DataI } from "@/interfaces/Data"
interface Props{
    data:DataI
}
const Contact = ({data}:Props) => {
  return (
<section className=" body-font relative " id="contacto">
  <article className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
    <section className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
      <iframe width="100%" height="100%" className="absolute inset-0  min-h-[70vh]"  title="map"  src="https://www.google.com/maps/d/u/0/embed?mid=12qN4pPlNC7SzCk_A0KF8xdJd7mDwZoA&ehbc=2E312F&noprof=1" ></iframe>
      <div className="bg-white relative   flex flex-wrap  py-2 md:py-6 rounded shadow-md">
        <div className="lg:w-1/2  px-2 md:px-6">
          <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">Areas de Servicio:</h2>
          <p className="mt-1 text-xs md:text-base">La Paz, Los Cabos</p>
        </div>
        <div className="lg:w-1/2 px-2 md:px-6 mt-4 lg:mt-0">
          <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">Correo Electronico:</h2>
          <a className="text-indigo-500 text-xs md:text-base leading-relaxed">agro@jardines.com</a>
        </div>
      </div>
    </section>
    <section className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
      <h2 className="text-gray-900 font-semibold text-lg mb-1 title-font">{data.data.contact_title}</h2>
      <p className="leading-relaxed mb-5 ">{data.data.contact_subtitle}</p>
      <form>

      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm ">Nombre</label>
        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required minLength={7} pattern="[A-Za-z ]+" title="Solo letras y espacios"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm ">Correo Electronico</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
      </div>
      
      <div className="relative mb-4">
        <label htmlFor="message" className="leading-7 text-sm ">Mensaje</label>
        <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" required minLength={20} maxLength={500} />
      </div>
      <input type="submit" className="text-white bg-[#2971D9] border-0 py-2 px-6 focus:outline-none hover:opacity-90 rounded text-lg" value="enviar mensaje"/>

      </form>
   
    </section>
  </article>
</section>
  )
}

export default Contact