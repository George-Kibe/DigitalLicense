import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const AWS_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const AWS_S3_REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION;
const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

async function uploadImageToS3(file, ext) {
  const s3Client = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  // Generate a unique key for the uploaded image
  const fileName = `${Date.now()}.${ext}`;

  // Set up parameters for the S3 upload
  const uploadParams = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
  };

  try {
    // Use the Upload class for handling large file uploads
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
      leavePartsOnError: false,
    });

    // Start the upload process
    const data = await parallelUploads3.done();
    return `https://qddl-images-bucket.s3.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
}

export default uploadImageToS3;
