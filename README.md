# fastify-mssql-msnodesqlv8

MSSQL / MSNodeSQLv8 Plugin for Fastify.

## Installation

```
npm install fastify-mssql-msnodesqlv8
```

## Usage

### Example

#### Trusted Connection (instanceName not required)
```js
const Fastify = require('fastify')
const mssql = require('fastify-mssql-msnodesqlv8')

const app = Fastify()

app.register(mssql, {
  server: 'my-host',
  port: 1433,
  database: 'my-database',
  options: {
    encrypt: false,
    trustedConnection: true,
    useUTC: false,
    trustServerCertificate: true,
    instanceName: 'MSSQLSERVER'
  },
  pool: {
    min: 1,
    max: 10,
    idleTimeoutMillis: 30000
  }
})

app.get('/users', async function (req, reply) {
  try {
    await app.mssql.pool.connect();
    const res = await app.mssql.pool.query('SELECT * FROM users');
    return { users: res.recordset }
  } catch (err) {
    return err;
  }
})

app.listen(3000)
```

#### Username and Password (instanceName not required)
```js
const Fastify = require('fastify')
const mssql = require('fastify-mssql-msnodesqlv8')

const app = Fastify()

app.register(mssql, {
  server: 'my-host',
  port: 1433,
  user: 'my-user',
  password: 'my-password',
  database: 'my-database',
  options: {
    encrypt: false,
    useUTC: false,
    trustServerCertificate: true,
    instanceName: 'MSSQLSERVER'
  },
  pool: {
    min: 1,
    max: 10,
    idleTimeoutMillis: 30000
  }
})

app.get('/users', async function (req, reply) {
  try {
    await app.mssql.pool.connect();
    const res = await app.mssql.pool.query('SELECT * FROM users');
    return { users: res.recordset }
  } catch (err) {
    return err;
  }
})

app.listen(3000)
```

If you need to access the [SQL Data Types](https://www.npmjs.com/package/mssql#data-types) you can access them by using the `mssql.TYPES` property:

```js
app.get('/users/:userId', async function (request) {
  try {
    const pool = await app.mssql.pool.connect()
    const query = 'SELECT * FROM users where id=@userID'
    const res = await pool
      .request()
      .input('userID', app.mssql.TYPES.Int, request.params.userId)
      .query(query)
    return { user: res.recordset }
  } catch (err) {
    return { error: err.message }
  }
})
```
