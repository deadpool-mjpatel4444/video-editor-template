/**
 * Programmatic API for headless rendering with Remotion Lambda.
 *
 * Uses the Remotion Lambda client to render Composition.ts to Video.mp4
from a serverless environment (ARM64) where Chromium is not available locally.
 */

import * as remotion from "@remotion/lambda-clients";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configuration ---------------------------------------------------------------------
const CONFIG = {
  // Target S3 bucket / output path
  OUTPUT_BUCKET: "video-renders",
  // Key prefix for S3 objects
  OBJECT_PREFIX: "videos",
  // Composition to render (passed as argument)
  COMPOSITION_NAME: "MyVideo",
};

/**
 * Programmatic headless render using Remotion Lambda client.
 * 
 * Args:
 *   - composition: Path to the composition file (e.g. "./src/MyVideo.tsx")
 *   - output: S3 URI (e.g. "s3://video-renders/my-video.mp4")
 *   - version?: Specific version tag to render (optional)
 *
 * Throws:
 *   - Error if render fails
 */
export async function render(
  composition: string,
  output: string,
  version?: string = undefined
): Promise<string> {
  // Build the S3 destination URI
  const s3Uri = `${CONFIG.OUTPUT_BUCKET}/${CONFIG.OBJECT_PREFIX}/${version ? version : ""}${output}`;

  // Create S3 client (uses default credential resolver)
  const s3 = new S3Client({});

  // Invoke the Remotation Lambda entrypoint
  // The Lambda runtime will execute the built-in remotion render handler
  await promisify(remotion._LAMBDA_render)
    .bind(null)
    (s3, version !== undefined ? { composition, output: s3Uri } : {})
    .then((s3Response: any) => ({ success: true, url: s3Response.url }))
    .catch((err: Error) => (_ => {
      console.error("Render failed:", err.message);
      throw err;
    }));
}

/**
 * Alternative: Direct client call for more granular control over the Lambda environment.
 *
 * Use this when you need to programmatically invoke the Lambda handler at
 * arbitrary scheduling times (e.g. scheduled jobs, external triggers).
 */
export async function renderDirect(
  composition: string,
  s3Uri: string
): Promise<string> {
  // Initialize Swagger v2 endpoint for Lambda invocation
  // The @remotion/lambda client exposes a programmatic handler method
  return remotion.<LAMBDA_CLIENT>.handlers.render.bind(undefined)('s3', composition, s3Uri);
}
