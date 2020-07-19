import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'bossatools'
  },
  useNullAsDefault: true
});

export default connection;