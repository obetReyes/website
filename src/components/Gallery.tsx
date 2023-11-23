import { DataI } from "@/interfaces/Data";
import Image from "next/image";
interface Props{
    data:DataI
}
const gallery = ({data}:Props) => {
  const galleryTitle = data.data?.gallery_title.split(" ")
 
  return (
    <section className="gallery" id="trabajo">
 <div className="container mx-auto px-5 py-2 lg:px-16 lg:pt-24 flex flex-col items-center">
 <div className="relative mb-4 ml-4 inline-flex">
                  <span className="absolute  inset-x-0 bottom-0 border-b-[30px] border-[#71BF11]"></span>
                  <h2 className="relative text-2xl font-bold text-black sm:text-6xl lg:text-4xl">
                  <span className="underline">{galleryTitle[0]}</span> {galleryTitle[1]}
                  </h2>
                </div>
       
      <div className="-m-1 flex    flex-row sm:flex-wrap md:-m-2">
        <div className="flex w-full sm:w-1/2 flex-wrap lg:flex-row flex-row-reverse">
          <div className="w-full lg:w-1/2 p-1 md:p-2">
            <Image
              width={400}
              height={400}
              alt={data.data.images[2].url.split("agrojardines/")[1] + "imagen"}
              className="block h-full w-full rounded-lg 2xl:rounded-2xl object-cover object-center"
              src={data.data.images[2].url}
            />
          </div>
          <div className="w-full lg:w-1/2 p-1 md:p-2">
            <Image
              width={400}
              height={400}
              alt={data.data.images[3].url.split("agrojardines/")[1] + "imagen"}
              className="block h-full w-full rounded-lg 2xl:rounded-2xl object-cover object-center"
              src={data.data.images[3].url}
            />
          </div>
          <div className="w-full p-1 md:p-2">
            <Image
              width={400}
              height={400}
              alt={data.data.images[4].url.split("agrojardines/")[1] + "imagen"}
              className="block h-full w-full rounded-lg 2xl:rounded-2xl object-cover object-center max-h-none lg:max-h-[1000px]"
              src={data.data.images[4].url}
            />
          </div>
        </div>
        <div className="flex w-full sm:w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <Image
              width={400}
              height={400}
              alt={data.data.images[5].url.split("agrojardines/")[1] + "imagen"}
              className="block h-full w-full rounded-lg 2xl:rounded-2xl object-cover object-center"
              src={data.data.images[5].url}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              width={400}
              height={400}
              alt={data.data.images[6].url.split("agrojardines/")[1] + "imagen"}
              className="block h-full w-full rounded-lg 2xl:rounded-2xl object-cover object-center"
              src={data.data.images[6].url}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              width={400}
              height={400}
              alt={data.data.images[7].url.split("agrojardines/")[1] + "imagen"}
              className="block h-full w-full rounded-lg 2xl:rounded-2xl object-cover object-center"
              src={data.data.images[7].url}
            />
          </div>
        </div>
      </div>
    </div>
    </section>
   
  );
};
export default gallery;
