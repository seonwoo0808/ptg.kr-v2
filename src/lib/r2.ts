import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

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

export default async function R2List(){
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
                if (item.Key && item.LastModified && item.ETag && item.Size !== undefined) {
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