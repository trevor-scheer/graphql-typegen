#!/usr/bin/env node
const meow = require('meow');
const typeGen = require('./graphql-typegen');
const conf = require('rc')('typegen', {
  endpoint: 'http://wayfaircom.csnzoo.com/graphql',
  header: 'Cookie: SERVER=MASTER',
  output: './',
  queries: './**/*.js',
  target: 'flow'
});

const cli = meow(
  `
    Usage
      ~ Options can be specified in a .typegenrc file at various levels throughout the codebase ~
      $ wf-graphql-typegen [options]
 
    Options
      --help         Show command help
      -E, --endpoint [default: http://wayfaircom.csnzoo.com/graphql] The URL of the server to fetch the schema from
      -H, --header   [default: 'Cookie: SERVER=MASTER'] Additional headers to send to server for introspectionQuery
                     (Hint: You probably want 'Cookie: SERVER=<YOUR_VM_NAME>')
      -O, --output   [default: ./] Directory and filename to write types to
      -Q, --queries  [default: ./**/*.js] Path to GraphQL queries (gql tags)
      -S, --schema   (optional) Use the given schema instead of using the result of an introspection query
      -T, --target   [default: flow] (swift | typescript | flow | scala)
`,
  {
    flags: {
      endpoint: {
        type: 'string',
        alias: 'E'
      },
      header: {
        type: 'string',
        alias: 'H'
      },
      output: {
        type: 'string',
        alias: 'O'
      },
      queries: {
        type: 'string',
        alias: 'Q'
      },
      schema: {
        type: 'string',
        alias: 'S'
      },
      target: {
        type: 'string',
        alias: 'T'
      }
    }
  }
);

typeGen(conf, cli.flags);
