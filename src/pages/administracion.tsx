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
      console.error("An error occurred while fetching the data: ", e);
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

    console.log("ids", ids)
    formData.append(
      "ids",
      ids
);
    const setImages = await fetch("http://localhost:3000/api/website/images", {
      method: "PUT",
      body: formData,
    }).then((res) => res.json());
    console.log(setImages);

  const { images, ...restOfData } = data;
const webContent = { ...restOfData };
    const setData = await fetch("http://localhost:3000/api/website",{
      method: "PUT",
      body:JSON.stringify(webContent),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    console.log(setData)
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
          </fieldset>
          <input type="submit" value="hacer cambios" className={submitInput} />
        </form>
      </Suspense>
    );
};

export default Administracion;
