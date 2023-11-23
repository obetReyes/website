// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {z} from "zod"
import prisma from '../../../../prisma/db';
import { MulterFile } from '@/interfaces/Files';





export default async function handler(req:NextApiRequest, res:NextApiResponse)  {
    switch (req.method) {
      case 'GET':
      try { 
          
        const  serviceName  = req.query.id;
       
        const getService = await prisma.service.findUnique({
            where:{
                name:String(serviceName)
            },
            select:{
                id:true,
                name:true,
                description:true,
                images:true
            }
        })
    
  
        return res.status(200).json(getService)
      }
    catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(error.issues)
      }else{
        return res.status(400).json(error)
      }
    }
   
  
    
   
      
  
  
  //loop array
    
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    } 
  
  };