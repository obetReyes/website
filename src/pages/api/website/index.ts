// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {z} from "zod"
import prisma from '../../../../prisma/db';
import { MulterFile } from '@/interfaces/Files';
import { getServerSession } from 'next-auth';
import  nextAuth  from "../auth/[...nextauth]"


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
                description:true,
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
    const session = await getServerSession(req, res, nextAuth)

    if(session){
  try {


      if (session) {

      }
    const body =  schema.parse(req.body)

      await prisma.content.update({
        where:{
          id:1
        },
        data:{
          hero_title:body.hero_title,
          services_title:body.services_title,
          services_description:body.services_description,
          gallery_title:body.gallery_title,
          contact_title:body.contact_title,
            contact_subtitle:body.contact_description,
        }
      })
      const servicesNames = [ body.service_one_title, body.service_two_title, body.service_three_title, body.service_four_title, body.service_five_title, body.service_six_title]
      const servicesDescription =  [ body.service_one_description, body.service_two_description, body.service_three_description, body.service_four_description, body.service_five_description, body.service_six_description]

      if(servicesNames.length > 1){
        for(let i = 0; i < servicesNames.length; i++){
          console.log("index",[i + 1], "name", servicesNames[i], "desc", servicesDescription[i])
          await prisma.service.update({
            where:{
              id:Number(i + 1)
            },
            data:{
              name:String(servicesNames[i]),
              description:String(servicesDescription[i])
            }
           })
        }
    }
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
}else{
  return res.status(401).json({message:"you are not allowed to perform  this action"})
}
    


//loop array
  
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  } 

};