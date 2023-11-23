
import { s3Client } from '@/server/s3client';
import uploadMiddleware from '@/server/upload.middleware';
import { DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/db';
import { Upload } from '@aws-sdk/lib-storage';
import stream from "stream"
import { getServerSession } from 'next-auth';
import  nextAuth  from "../auth/[...nextauth]"


export const config = {
    api: {
      bodyParser: false,
    },
  }

  interface CustomNextApiRequest extends NextApiRequest {
    files: File[];
  }
  
// Your API route
export default async function handler(req:CustomNextApiRequest, res:NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      const session = await getServerSession(req, res, nextAuth)

      if(session){

      try {
        uploadMiddleware(req as any, res as any, async (err: any) => {
              if (err) {
                  console.error('Error uploading files:', err);
                  return res.status(500).send(err.message);
              }

              // Access the files and other form data
              const files = req.files;
            
              const body = req.body;
              const ids = body.ids.split(",")
              
              // Iterate through the array
              if(files.length > 0 && ids.length == files.length){
                const bucket =process.env.SPACES_BUCKET_NAME as string

                files.map(async (file: any, index) => {
        
                  const checkIfFile = new HeadObjectCommand({ Bucket: bucket, Key: `agrojardines/${file.originalname}` });
                
                  
                  try {
                    const response = await s3Client.send(checkIfFile);
                    // si existe en los metadatos
                    console.log("response id", response.Metadata?.id);
                    console.log("inde id must be the index to update", ids[index])
                 
                 
                 
                    const updateImage = await prisma.image.update({
                      where:{
                        id:Number(ids[index])
                      },data:{
                        url:`https://bsfreekib.nyc3.cdn.digitaloceanspaces.com/agrojardines/${file.originalname}`
                      }
                    })
                    
                    
                    return res.status(200).json("se ha actualizado la imagen")
                  
                  } catch (error: any) {
           
              
                    if (error.name === "NotFound") {
            
                      const streamdata = new stream.PassThrough();

                      try {
                          console.log("file", file)                        
                        const uploads3 = new Upload({
                          client: s3Client,
                          params: { Bucket:bucket, Key:`agrojardines/${await file?.originalname}`, Body: await file.buffer,
                          ACL: 'public-read', 
                          Metadata:{
                            id:ids[index]
                          }
                          },
                      
                          tags: [
                            /*...*/
                          ], // optional tags
                          queueSize: 4, // optional concurrency configuration
                          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                          leavePartsOnError: false, // optional manually handle dropped parts
                        });
                        streamdata.write(await file.buffer);
                    
                   
                        const isDone = await uploads3.done()
                        
                        if(isDone){
                          const getImage = await prisma.image.findUnique({
                            where:{id:Number(ids[index])}
                          })
                          const delImgKey = getImage?.url.split("./com"[1])
                          const deleteImage = new DeleteObjectCommand({
                            Bucket: bucket,
                            Key:  `agrojardines/${delImgKey![delImgKey!.length -1]}`,
                          });
                          
                          try {
                            const responsedel = await s3Client.send(deleteImage)  
                            if(responsedel){
                              const updateDbUrl = await prisma.image.update({
                                where:{
                                  id:Number(ids[index])
                                },data:{
                                 url:`https://bsfreekib.nyc3.cdn.digitaloceanspaces.com/agrojardines/${file.originalname}`
                                }
                              })
                            }
                            
                            
                          } catch (error) {
                            console.log(error)
                          }
                        }
                      } catch (error) {
                        console.log(error)
                      }
                  
                 
                   


                    }
                  }
                });
            

              }else{
                return res.status(200).json({data:"no images were sent"})
              }
              // Process the files and metadata as needed
           
              return res.status(200).json({ success: true });
          });
      } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).send(error)
      }
    }else{
      return res.status(401).json({message:"you are not allowed to perform  this action"})
    }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}