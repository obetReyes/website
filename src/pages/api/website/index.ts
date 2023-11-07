// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { s3Client } from '@/server/s3client';
import { Upload } from '@aws-sdk/lib-storage';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import {z} from "zod"
import { DataI } from '@/interfaces/Data';
import { convertJsonToArray } from '@/server/convertToArray';
import prisma from '../../../../prisma/db';

const schema = z.object({
  description:z.string().optional(),
  hero_title:z.string().optional(),
  hero_img: z.instanceof(File).optional(),
  service_title:z.string().optional(),
  service_description:z.string(),
  service_image:z.instanceof(File).optional(),
  service_one_title:z.string().optional(),
  service_one_description:z.string().optional(),
  service_one_image:z.instanceof(File).optional(),
  service_two_title:z.string().optional(),
  service_two_description:z.string().optional(),
  service_two_image:z.instanceof(File).optional(),
  service_three_title:z.string().optional(),
  service_three_description:z.string().optional(),
  service_three_image:z.instanceof(File).optional(),
  service_four_title:z.string().optional(),
  service_four_description:z.string().optional(),
  service_four_image:z.instanceof(File).optional(),
  service_five_title:z.string().optional(),
  service_five_description:z.string().optional(),
  service_five_image:z.instanceof(File).optional(),
  service_six_title:z.string().optional(),
  service_six_description:z.string().optional(),
  service_six_image:z.instanceof(File).optional(),
  gallery_title:z.string().optional(),
  gallery_image_one:z.instanceof(File).optional(),
  gallery_image_two:z.instanceof(File).optional(),
  gallery_image_three:z.instanceof(File).optional(),
  gallery_image_four:z.instanceof(File).optional(),
  gallery_image_five:z.instanceof(File).optional(),
  gallery_image_six:z.instanceof(File).optional(),
  contact_title:z.string().optional(),
  contact_description:z.string().optional()
}).strict("the body don't match the fields");



type Data = {
  name: string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse)  {
  switch (req.method) {
    case 'GET':
    try { 
        
     
     
      const getContent = await prisma.content.findUnique({
        where:{
          id:1,
          },include:{
            services:{
              select:{
                id:true,
                name:true,
                images:{
                  select:{
                    id:true,
                    url:true
                  }
                }
              }
            },images:{
              where:{
                service_Id:null
              },select:{
                id:true,
                url:true
              }
            }
          }
      })

      return res.status(200).json(getContent)
    }
  catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.issues)
    }else{
      return res.status(400).json(error)
    }
  }
 

  
  case 'PUT':


    

    const body =  schema.parse(req.body)

    const bodyImages = [body.hero_img, body.service_image, body.service_one_image, body.service_two_image, body.service_three_image, body.service_four_image, body.service_five_image, body.service_six_image, body.gallery_image_one, body.gallery_image_two, body.gallery_image_three, body.gallery_image_four, body.gallery_image_five, body.gallery_image_six]

    const getContent = await prisma.content.findUnique({
      where:{
        id:1,
        },include:{
          services:{
            select:{
              id:true,
              name:true,
            }
          },images:{
            select:{
              id:true,
              url:true
            }
          }
        }
    })

    getContent?.images.map(async(img,idx) => {
      const imagekey = img.url.split(".com/")[1]
        if(imagekey !== bodyImages[idx]?.name){
          const bucket =process.env.SPACES_BUCKET_NAME as string 

          try {
            const parallelUploads3 = new Upload({
              client: s3Client,
              params: { Bucket:bucket, Key:bodyImages[idx]?.name, Body: bodyImages[idx]?.stream()},
          
              tags: [
                /*...*/
              ], // optional tags
              queueSize: 4, // optional concurrency configuration
              partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
              leavePartsOnError: false, // optional manually handle dropped parts
            });
          
            parallelUploads3.on("httpUploadProgress", (progress) => {
              console.log(progress);
            });

            const isDone = await parallelUploads3.done()

            if(isDone){
            const deleteImgBucket = new DeleteObjectCommand({
              Bucket: bucket,
              Key: imagekey,
            }) 
          
            await s3Client.send(deleteImgBucket)
            
            await prisma.image.update({
              where:{
                id:img.id
              },data:{
                url:img.url.split(".com/")+bodyImages[idx]!.name
              }
            })
          }

          } catch (e) {
            console.log(e);
          }
       
      
        }
    })


//loop array
  
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  } 

};