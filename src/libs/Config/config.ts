import { url } from "inspector";

export default () => ({
    database: {
      type: process.env.DATABASE_TYPE || 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://Api-SchoolsTips:Api-SchoolsTips@localhost:5432/SchoolsTips',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'Api-SchoolsTips',
      password: process.env.DATABASE_PASSWORD || 'Api-SchoolsTips',
      db: process.env.DATABASE_DB || 'SchoolsTips',
    },
  });