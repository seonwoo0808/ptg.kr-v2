import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
// import { Readable } from 'stream'

const s3Client = new S3Client({
  region: process.env.R2_REGION,
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // R2 requires path-style URLs
})

export interface R2Object {
  Key: string
  LastModified: Date
  ETag: string
  Size: number
}

export default async function R2List() {
  let result: R2Object[] = []
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      MaxKeys: 999, // 옵션
      Prefix: '', // 특정 접두사로 필터링하려면 여기에 입력
    })
    const data = await s3Client.send(command)
    if (data.Contents) {
      for (const item of data.Contents) {
        if (
          item.Key &&
          item.LastModified &&
          item.ETag &&
          item.Size !== undefined
        ) {
          result.push({
            Key: item.Key,
            LastModified: item.LastModified,
            ETag: item.ETag,
            Size: item.Size,
          })
        }
      }
    }
  } catch (error: any) {}

  return result
}
export const R2Put = async (key: string, markdown: string) => {
  try {
    const putCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: markdown,
      ACL: 'public-read', // ACL 설정 (PutObjectCommand supports ACL)
    })
    await s3Client.send(putCommand)
  } catch (error: any) {
    console.error('Error uploading file:', error)
    return error.message
  }
  return 'File uploaded successfully'
}

export const generateKey = (
  title: string,
  description: string,
  slug: string,
  createdDate: Date,
) => {
  return (
    slug +
    '/' +
    title +
    '|' +
    description +
    '|' +
    createdDate.toDateString() +
    '.mdx'
  )
}

export const validateData = (
  title: string,
  content: string,
  description: string,
  slug: string,
  createdDate: Date,
) => {
  if (!title || !content || !description || !slug) {
    return 'Title, content, description, and slug are required.'
  }
  // Add more validation logic as needed
  const key =
    slug +
    '|' +
    title +
    '|' +
    description +
    '|' +
    createdDate.toDateString() +
    '.mdx'
  if (key.length > 1024) {
    return 'Key is too long, please shorten the title, description, or slug.'
  }
  return false
}
