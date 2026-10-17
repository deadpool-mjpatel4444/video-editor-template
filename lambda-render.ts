/**
 * Wrapper around the Remotion Lambda client for serverless rendering.
 *
 * Designed for deploying to AWS Lambda (ARM64) where Chromium is not present.
 * On a development machine you still prefer local rendering; this module is the
 * “production” entrypoint for ARM64 pipelines.
 */

import * as remotion from "@remotion/lambda-clients";
import * as aws from "@aws-sdk/client-s3";

// Minimal configuration -------------------------------------------------
const LAMBDA_CONFIG = {
  outputBucket: process.env.REMOTION_BUCKET ?? "video-renders",
  s3Region: "us-east-1",
  composition: process.env.REMOTION_COMPOSITION ?? "MyVideo",
  version: process.env.REMOTION_VERSION || undefined,
};

// ── Public API ────────────────────────────────────────────────────────

export async function renderToS3(
  composition: string,
  optionalVersion?: string,
  s3Bucket?: string,
  s3Prefix?: string
): Promise<{
  objectKey: string;
  url: string;
}> {
  // Merge configuration defaults with injected values
  const outputInfo = { composition, version: optionalVersion !== undefined ? optionalVersion : undefined };
  const s3 = aws.S3Client({ regionName: LAMBDA_CONFIG.s3Region });

  const objectKey =
    `${LAMBDA_CONFIG.outputBucket}/${LAMBDA_CONFIG.OBJECT_PREFIX}/${optionalVersion
      ? outputInfo.version : ''}${s3Bucket ?? "video-renders"\/${s3Prefix ?? "videos"}\/`\"${options?}=1`}"`}`;

  // Call the Lambda endpoint programmatically
  const params = {
    Bucket: LAMBDA_CONFIG.outputBucket,
    Key: objectKey,
    VersionId: outputInfo?.version,
  };

  const response = await remotion._LAMBDA_handler.invoke(params);

  // Return the S3 location info
  return {
    objectKey: response.Key,
    url: `s3://${LAMBDA_CONFIG.outputBucket}/${objectKey}`,
  };
}

/**
 * Convenience wrapper for the typical CLI pattern:
 *   npx remotion render src/index.ts MyVideo s3://bucket/output.mp4
 *
 * Breaks down into two steps internally:
 *   1. Lambda render (programmatic)
 *   2. Optional S3 upload (already covered by the Lambda step in production)
 */
export async function render(source: string, composition: string, outputBase: string = "s3"): Promise<void> {
  // The underlying Lambda render handles everything including S3 staging.
  // This function is mainly here for the CLI layer to maintain symmetry.
  await remotion._LAMBDA_handler.render({
    source,
    composition,
    output: outputBase,
  });
}
