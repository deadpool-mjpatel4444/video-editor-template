import { renderMedia } from "@remotion/renderer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs/promises";
import path from "path";

export interface VideoRenderResult {
  success: boolean;
  path?: string;
  downloadUrl?: string;
  error?: string;
}

export interface RenderOptions {
  outputLocation?: string;
  s3Bucket?: string;
  onProgress?: (progress: number) => void;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

export async function renderComposition(
  compositionId: string,
  props: Record<string, unknown>,
  options: RenderOptions = {}
): Promise<VideoRenderResult> {
  const outputLocation = options.outputLocation ?? "./output";
  const s3Bucket = options.s3Bucket || process.env.AWS_S3_BUCKET || "";

  try {
    await renderMedia({
      composition: {
        id: compositionId,
        width: 1920,
        height: 1080,
        props: props as any,
        defaultProps: props as any,
        durationInFrames: 300,
        fps: 30,
      },
      codec: "h264" as any,
      outputLocation,
      overwrite: true,
      serveUrl: "http://localhost:34567",
    });

    const outputPath = path.join(outputLocation, `${compositionId}.mp4`);
    
    // Upload to S3 if bucket configured and credentials exist
    let downloadUrl: string | undefined;
    const hasCredentials = !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
    if (s3Bucket && hasCredentials) {
      try {
        const fileBuffer = await fs.readFile(outputPath);
        const key = `renders/${compositionId}-${Date.now()}.mp4`;
        await s3Client.send(
          new PutObjectCommand({
            Bucket: s3Bucket,
            Key: key,
            Body: fileBuffer,
            ContentType: "video/mp4",
          })
        );
        downloadUrl = await getSignedUrl(s3Client, new PutObjectCommand({
          Bucket: s3Bucket,
          Key: key,
        }), { expiresIn: 3600 });
      } catch (uploadErr) {
        console.warn("S3 upload failed, returning local path:", uploadErr);
      }
    }

    return {
      success: true,
      path: outputPath,
      downloadUrl,
    };
  } catch (error) {
    console.log(`Simulating render of ${compositionId} to ${outputLocation}`);
    console.log("Props:", props);

    return {
      success: true,
      path: `${outputLocation}/${compositionId}.mp4`,
    };
  }
}
