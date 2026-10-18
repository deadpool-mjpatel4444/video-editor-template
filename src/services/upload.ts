import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface UploadConfig {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface UploadResult {
  url: string;
  key: string;
  size: number;
}

// ponytail: global lock, per-account locks if throughput matters
const client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    : undefined,
});

export async function generateUploadUrl(
  key: string,
  contentType: string,
  bucket?: string
): Promise<UploadResult> {
  const targetBucket = bucket || process.env.REMOTION_BUCKET || "";
  const uploadParams = {
    Bucket: targetBucket,
    Key: key,
    ContentType: contentType,
  };
  
  const url = await getSignedUrl(client, new PutObjectCommand(uploadParams), { expiresIn: 3600 });
  
  return {
    url,
    key,
    size: 0, // size determined at actual upload time
  };
}

export async function generateDownloadUrl(
  key: string,
  bucket?: string
): Promise<string> {
  const targetBucket = bucket || process.env.REMOTION_BUCKET || "";
  return getSignedUrl(client, new GetObjectCommand({ Bucket: targetBucket, Key: key }), { expiresIn: 3600 });
}
