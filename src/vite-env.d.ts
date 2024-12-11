/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_SERVER_ADDRESS: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;

    readonly VITE_S3_BUCKET_NAME: string;
    readonly VITE_S3_ACCESS_KEY: string;
    readonly VITE_S3_SECRET_ACCESS_KEY: string;
    readonly VITE_S3_REGION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}