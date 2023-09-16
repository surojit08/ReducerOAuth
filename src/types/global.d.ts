declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
            AUTH_DB_NAME:string,
            AUTH_DB_USER:string,
            AUTH_DB_USER_PASSWORD:string,
            AUTH_DB_HOST:string,
            SSL:string
        }
    }
}
export {}