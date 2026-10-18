import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface UploadConfig {
  bucket?: string;
  key: string;
  expiresIn?: number;
  contentType?: string;
}

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

export async function generateUploadUrl(config: UploadConfig): Promise<string> {
  const client = getS3Client();
  const bucket = config.bucket || process.env.REMOTION_BUCKET || process.env.AWS_S3_BUCKET;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: config.key,
    ContentType: config.contentType,
  });
  return getSignedUrl(client, command, { expiresIn: config.expiresIn || 3600 });
}

export async function generateDownloadUrl(config: UploadConfig): Promise<string> {
  const client = getS3Client();
  const bucket = config.bucket || process.env.REMOTION_BUCKET || process.env.AWS_S3_BUCKET;
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: config.key,
  });
  return getSignedUrl(client, command, { expiresIn: config.expiresIn || 3600 });
}
