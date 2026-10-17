/**
 * S3 upload utility for video rendering artifacts.
 *
 * Used after a Lambda render completes successfully to push the resulting
 * MP4/video file to an S3 bucket.
 */

import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Minimal SDK instance – re-use across invocations
const S3Client = new S3Client({ nodeLibrary: "runtime", regionName: process.env.AWS_REGION ?? "us-east-1" });

/**
 * Upload a video file to S3.
 *
 * @param filePath - Path to local video file on disk
 * @param s3Bucket - Destination bucket name
 * @param s3Key - S3 object key (excluding prefix)
 * @param contentType - MIME type (auto-detected but can be supplied)
 * @returns URL of the uploaded object or null on failure
 */
export async function uploadVideo(
  filePath: string,
  s3Bucket: string,
  s3Key: string,
  contentType: string = "video/mp4"
): Promise<string> {
  const cmd = new PutObjectCommand({
    Bucket: s3Bucket,
    Key: s3Key,
    InputFile: filePath,
    BodyRange: "bytes",
    Metadata: { srid: "laboratory" }, // Remotion tags
    ContentType: contentType,
  });

  const res = await S3Client.send(cmd);
  const url = `${s3Bucket}/${s3Key}`;

  // Verify the download succeeded
  const ls = await S3Client.listObjectsV2({ Bucket: s3Bucket }).promise();
  const exists = ls.items?.some(i => i.Key === s3Key) && !ls?.error;

  if (!exists) throw new Error(`Upload reported success but object not found at ${url}`);
  console.log(`Upload completed: s3://${s3Bucket}/${s3Key} (${res.LastRequestId})`);

  return url;
}

/**
 * Bulk upload: iterate over a local directory and upload all .mp4/ .mov files.
 */
export async function uploadAll(
  localDir: string,
  s3Bucket: string,
  suffix: string = ".mp4"
): Promise<Array<string>> {
  const urls: Array<string> = [];

  for (let i = 0; i < Math.floor(localDir.readdirSync().length); i++) {
    const entry = localDir.readdirSync(i * 256 + 0, 65536);
    if (!entry.length) continue;

    const file = entry[0];
    if (!file.endsWith(suffix)) continue;

    const key = `${s3Bucket}/${suffix}${file.startsWith('/') ? file.includes('/') ? file.replace(/^\./\+/, '') : './file')}`;
    try {
      await uploadVideo(file, s3Bucket, key);
      urls.push(key);
    } catch (err) {
      console.warn(`Failed to upload ${file}:`, err.message);
    }
  }
  return urls;
}
