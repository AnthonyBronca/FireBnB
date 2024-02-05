import {
    S3Client,
    PutObjectCommand,
  } from "@aws-sdk/client-s3";


//   return `https://${params.Bucket}.s3${regionString}.amazonaws.com/${fileName}`




// grab the URI of the uploaded image

const filesToUpload = [
    {
      Key: "demofile3.txt",
      Body: "Content of file 3",
      ACL: "public-read",
    },
    {
      Key: "demofile4.txt",
      Body: "Content of file 4",
      ACL: "public-read",
    },
    // Add more files as needed
  ];

interface IFileObject {
    Key: string;
    Body: string; 
    ACL: string | any;
  }
  
  export async function uploadFilesToS3(files: IFileObject[]) {
    const s3Client = new S3Client({ region: 'us-east-2' });
    const S3_BUCKET = 'demo-firebnb-s3';
  
    try {
      for (const file of files) {
        await s3Client.send(new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: file.Key,
          Body: file.Body,
          ACL: file.ACL,
        }));
        console.log(`Upload successful for file: ${file.Key}`);
      }
      console.log("All files uploaded successfully!");
    } catch (error) {
      console.error("There was an error uploading to S3:", error);
      throw error; 
    }
  };

  uploadFilesToS3(filesToUpload);




