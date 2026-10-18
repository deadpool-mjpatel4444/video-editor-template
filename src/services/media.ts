import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const getS3Client = () =>
  new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials:
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
  });

export async function uploadMedia(
  file: Buffer | Uint8Array | Blob | string,
  key: string,
  contentType?: string,
  bucket?: string
): Promise<{ key: string; bucket: string }> {
  const client = getS3Client();
  const targetBucket =
    bucket || process.env.REMOTION_BUCKET || process.env.AWS_S3_BUCKET || "";
  await client.send(
    new PutObjectCommand({
      Bucket: targetBucket,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );
  return { key, bucket: targetBucket };
}

export async function deleteMedia(
  key: string,
  bucket?: string
): Promise<{ key: string; bucket: string }> {
  const client = getS3Client();
  const targetBucket =
    bucket || process.env.REMOTION_BUCKET || process.env.AWS_S3_BUCKET || "";
  await client.send(
    new DeleteObjectCommand({
      Bucket: targetBucket,
      Key: key,
    })
  );
  return { key, bucket: targetBucket };
}
