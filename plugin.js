'use strict';

const fp = require('fastify-plugin');
const MSSql = require('mssql');

const poolDefaults = {
  min: 1,
  max: 10,
  idleTimeoutMillis: 30000
};

const optDefaults = {
  encrypt: false,
  trustedConnection: false,
  trustServerCertificate: true,
  useUTC: false
};

const defaults = {
  server: 'localhost',
  port: 1433,
  user: 'sa',
  password: '',
  database: '',
  options: optDefaults,
  pool: poolDefaults
};
const defaultOptions = {
  enableArithAbort: true
};

const plugin = async (fastify, config) => {
  const connectionConfig = Object.assign({}, defaults, config);
  connectionConfig.options = Object.assign({}, defaultOptions, config.options);

  const pool = await new MSSql.ConnectionPool(connectionConfig);

  fastify.addHook('onClose', async () => {
    await pool.close();
  });
  fastify.decorate('mssql', {
    pool,
    sqlTypes: MSSql
  });
};

module.exports = fp(plugin, {
  fastify: '>=3',
  name: 'fastify-mssql'
});
