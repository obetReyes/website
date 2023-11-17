// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {z} from "zod"
import prisma from '../../../../prisma/db';
import { MulterFile } from '@/interfaces/Files';

const schema = z.object({
  description:z.string().optional(),
  hero_title:z.string().optional(),
  services_title:z.string().optional(),
  services_description:z.string().optional(),
  service_one_title:z.string().optional(),
  service_one_description:z.string().optional(),
  service_two_title:z.string().optional(),
  service_two_description:z.string().optional(),
  service_three_title:z.string().optional(),
  service_three_description:z.string().optional(),
  service_four_title:z.string().optional(),
  service_four_description:z.string().optional(),
  service_five_title:z.string().optional(),
  service_five_description:z.string().optional(),
  service_six_title:z.string().optional(),
  service_six_description:z.string().optional(),
  gallery_title:z.string().optional(),
  contact_title:z.string().optional(),
  contact_description:z.string().optional()
}).strict("the body don't match the fields");



type Data = {
  name: string
}


interface MulterRequest extends NextApiRequest {
  files: MulterFile[];
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
  try {
    const body =  schema.parse(req.body)

      await prisma.content.update({
        where:{
          id:1
        },
        data:{
          ...body
        }
      })
    return res.status(200).json({data:"se ha actualizado el sitio"})
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.issues)
    }else{
      console.log("error",error)
      return res.status(400).json(error)
    }
  }
    


//loop array
  
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  } 

};