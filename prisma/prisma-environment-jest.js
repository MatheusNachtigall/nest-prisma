// import { TestEnvironment } from 'jest-environment-node';
// import { execSync } from 'child_process';
// import { v4 as uuid } from 'uuid';
// import { resolve } from 'path';
// import { Client } from 'pg';
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

    // Rodar as migrations
    execSync(`${prismaCli} migrate dev`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = CustomEnvironment;
