import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: import.meta.env.VITE_S3_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
    },
});

export default s3;