export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_DIALECT: 'postgres' | 'sqlite';
      DB_PASSWORD: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_DATABASE: string;
      DB_HOST: string;
    }
  }
}
