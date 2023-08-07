/* eslint-disable @typescript-eslint/no-var-requires */
const { TestEnvironment } = require('jest-environment-node');
const { v4: uuid } = require('uuid');
const { execSync } = require('child_process');
const { resolve } = require('path');
const { Client } = require('pg');

const prismaCli = './node_modules/.bin/prisma';

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test'),
});

class CustomEnvironment extends TestEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code_schema_${uuid()}`;
    console.log('schemas', this.schema);
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  setup() {
    console.log('connectionString', this.connectionString);
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    console.log('Executing migrations...');
    // Rodar as migrations
    execSync(`${prismaCli} migrate dev`);
    console.log('Migrations executed...');
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    console.log('Dropping Schema...');

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = CustomEnvironment;
