import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint:process.env.SPACES_ENDPOINT as string,
    region:process.env.SPACES_REGION as string,
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY as string,
      secretAccessKey: process.env.SPACES_SECRET_KEY as string
    }
});

export { s3Client };