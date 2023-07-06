import * as MSSql from 'mssql/msnodesqlv8';

import { FastifyInstance, FastifyPluginAsync } from 'fastify';

export interface MSNodeSQLv8Options {
  encrypt: boolean;
  trustServerCertificate: boolean;
  instanceName: string;
  trustedConnection: boolean;
  useUTC: boolean;
}

export interface MSNodeSQLv8PoolOptions {
  min: number;
  max: number;
  idleTimeoutMillis: number;
}

export interface MSSQLPluginOptions {
  server?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  connectionString?: string;
  options?: MSNodeSQLv8Options;
  pool?: MSNodeSQLv8PoolOptions;
}

export interface MSSQLFastifyInterface {
  pool: MSSql.ConnectionPool;
}

declare module 'fastify' {
  interface FastifyInstance {
    mssql: MSSQLFastifyInterface;
  }
}

declare const fastifyMssql: FastifyPluginAsync<MSSQLPluginOptions>;

export default fastifyMssql;
export { fastifyMssql };
