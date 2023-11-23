import Appbar from "@/components/Appbar";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";
import { AdminI, DataI } from "@/interfaces/Data";
import { FormDataI } from "@/interfaces/Form";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { imagesIds } from "@/server/imagesids";
const submitInput = "bg-orange-700 p-4 rounded shadow-xl float-right";

const form =
  "w-11/10 md:w-10/12 mx-auto border-2 border-blue-700 my-4 p-4 h-full";

const legend = "text-4xl text-center m-2 font-semibold uppercase";

const fieldSet = "py-12"

const Administracion = () => {
  const [data, setData] = useState<AdminI>();

  useEffect(() => {
    const fetchData = async () => {
      //cambiar cuando prd
      const response = await fetch("http://localhost:3000/api/website");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    };

    fetchData().catch((e) => {
      // handle the error as needed
     alert(`ocurrio un error: ${e} intentalo mas tarde o contacta al creador`);
    });
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataI>();
  
  const watchFields = watch();


  const onSubmit = handleSubmit(async (data: FormDataI) => {
    const formData = new FormData();

    const ids: any = [];

    Object.entries(data.images).filter(async (image: any, index) => {
      if (image[1].length == 1) {
        console.log("image", image)
        formData.append("files", image[1][0]);
        Object.keys(imagesIds).filter((key) => {
          if (image[0] == key) {
            ids.push(imagesIds[key]);
          }
        });
      }
    });

  
    formData.append(
      "ids",
      ids
);
    const setImages = await fetch("http://localhost:3000/api/website/images", {
      method: "PUT",
      body: formData,
    }).then((res) => res.json());
    

  const { images, ...restOfData } = data;
const webContent = { ...restOfData };
    const setData = await fetch("http://localhost:3000/api/website",{
      method: "PUT",
      body:JSON.stringify(webContent),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())

    alert("se ha modificado el sitio")
  });

  if (data)
    return (
      <Suspense fallback={<p>cargando datos...</p>}>
        <Appbar />
        <form className={form} onSubmit={onSubmit}>
          <legend className={legend}>Agrojardines</legend>
          <fieldset className={fieldSet}>
            <Input
              label="descripcion del sitio web (lo que aparece en  google abajo del titulo de la pagina)"
              value={data?.description || ""}
              register={register("description")}
            />
          </fieldset>
          <fieldset className={fieldSet}>
            <Input
              label="titulo inicio"
              value={data?.hero_title || ""}
              register={register("hero_title")}
            />

            <div>
              <ImageInput
                label="cambiar imagen fondo inicio"
                register={register("images.hero_image")}
                img={
                  watchFields.images?.hero_image  &&
                  watchFields.images?.hero_image[0] instanceof File
                    ? URL.createObjectURL(watchFields.images?.hero_image[0])
                    : data?.images[0].url
                }
              />
            </div>
          </fieldset>
          <fieldset>
          <Input
              label="titulo seccion servicios"
              value={data?.services_title || ""}
              register={register("services_title")}
            />
            <Input
              label="descripcion seccion servicios"
              value={data?.services_description || ""}
              register={register("services_description")}
            />
                <div className="max-w-4xl lg:max-w-2xl mx-auto">
              <ImageInput
                label="cambiar imagen seccion servicios"
                register={register("images.service_image")}
                img={
                  watchFields.images?.service_image &&
                  watchFields.images?.service_image[0] instanceof File
                    ? URL.createObjectURL(watchFields.images?.service_image[0])
                    : data?.images[1].url
                }
              />
            </div>
          </fieldset>
          <fieldset className="flex  my-24 flex-wrap ">
                <legend className="text-center text-4xl uppercase font-bold">servicios</legend>
              {/* service 1 */}
              <div className="flex flex-col w-full md:w-1/2 md:p-8">
              <Input
                label="servicio "
                value={data.services[0].name || ""}
                register={register("service_one_title")}
              />
              <Input
                label="descripcion "
                value={data.services[0].description || ""}
                register={register("service_one_description")}
              />
                <ImageInput
                  label={`cambiar imagen ${data.services[0].name} `}
                  register={register("images.service_one_image")}
                  img={data.services[0].images[0].url}
                />
              </div>
            
                  {/* service 2 */}
              <div className="flex flex-col w-full md:w-1/2 md:p-8">
              <Input
                label="servicio "
                value={data.services[1].name || ""}
                register={register("service_two_title")}
              />
              <Input
                label="descripcion "
                value={data.services[1].description || ""}
                register={register("service_two_description")}
              />
                <ImageInput
                  label={`cambiar imagen ${data.services[1].name} `}
                  register={register("images.service_two_image")}
                  img={data.services[1].images[0].url}
                />
              </div>

              {/* service 3 */}
              <div className="flex flex-col w-full md:w-1/2 md:p-8">
              <Input
                label="servicio "
                value={data.services[2].name || ""}
                register={register("service_three_title")}
              />
              <Input
                label="descripcion "
                value={data.services[2].description || ""}
                register={register("service_three_description")}
              />
                <ImageInput
                  label={`cambiar imagen ${data.services[2].name} `}
                  register={register("images.service_three_image")}
                  img={data.services[2].images[0].url}
                />
              </div>

  {/* service 4 */}
  <div className="flex flex-col w-full md:w-1/2 md:md:p-8">
              <Input
                label="servicio "
                value={data.services[3].name || ""}
                register={register("service_four_title")}
              />
              <Input
                label="descripcion "
                value={data.services[3].description || ""}
                register={register("service_four_description")}
              />
                <ImageInput
                  label={`cambiar imagen ${data.services[3].name} `}
                  register={register("images.service_four_image")}
                  img={data.services[3].images[0].url}
                />
              </div>

                {/* service 5 */}
  <div className="flex flex-col w-full md:w-1/2 md:p-8">
              <Input
                label="servicio "
                value={data.services[4].name || ""}
                register={register("service_five_title")}
              />
              <Input
                label="descripcion "
                value={data.services[4].description || ""}
                register={register("service_five_description")}
              />
                <ImageInput
                  label={`cambiar imagen ${data.services[4].name} `}
                  register={register("images.service_five_image")}
                  img={data.services[4].images[0].url}
                />
              </div>
   {/* service 6 */}
   <div className="flex flex-col w-full md:w-1/2 md:p-8">
              <Input
                label="servicio"
                value={data.services[5].name || ""}
                register={register("service_six_title")}
              />
              <Input
                label="descripcion "
                value={data.services[5].description || ""}
                register={register("service_six_description")}
              />
                <ImageInput
                  label={`cambiar imagen ${data.services[5].name} `}
                  register={register("images.service_six_image")}
                  img={data.services[5].images[0].url}
                />
              </div>
          </fieldset>

          <fieldset className="my-24">
          <legend className="text-center text-4xl uppercase font-bold">galeria</legend>
              
          <Input
                label="cambiar titulo galeria"
                value={data.gallery_title || ""}
                register={register("gallery_title")}
              />

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 md:p-4">
                <ImageInput
                  label="cambiar imagen"
                  register={register("images.service_six_image")}
                  img={data.images[2].url}
                />
                </div>
                <div className="w-full md:w-1/2 md:p-4">
                <ImageInput
                  label="cambiar imagen"
                  register={register("images.service_six_image")}
                  img={data.images[3].url}
                />
                </div>
                <div className="w-full md:w-1/2 md:p-4">
                <ImageInput
                  label="cambiar imagen"
                  register={register("images.service_six_image")}
                  img={data.images[4].url}
                />
                </div>
                <div className="w-full md:w-1/2 md:p-4">
                <ImageInput
                  label="cambiar imagen"
                  register={register("images.service_six_image")}
                  img={data.images[5].url}
                />
                </div>
                <div className="w-full md:w-1/2 md:p-4">
                <ImageInput
                  label="cambiar imagen"
                  register={register("images.service_six_image")}
                  img={data.images[6].url}
                />
                </div>
                <div className="w-full md:w-1/2 md:p-4">
                <ImageInput
                  label="cambiar imagen"
                  register={register("images.service_six_image")}
                  img={data.images[7].url}
                />
                </div>
              </div>

          </fieldset>

         <fieldset className="my-24">
         <legend className="text-center text-4xl uppercase font-bold">CONTACTO</legend>
         <Input
                label="cambiar titulo contacto"
                value={data.contact_title || ""}
                register={register("contact_title")}
              />
                   <Input
                label="cambiar frase contacto"
                value={data.contact_subtitle || ""}
                register={register("contact_description")}
              />
          </fieldset> 
          <input type="submit" value="hacer cambios" className={submitInput} />
        </form>
      </Suspense>
    );
};

export default Administracion;
