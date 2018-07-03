#!/usr/bin/env node
const meow = require('meow');
const typeGen = require('./graphql-typegen');
const conf = require('rc')('typegen', {
  endpoint: 'https://wayfaircom.csnzoo.com/graphql',
  header: 'Cookie: server=MASTER',
  output: 'generated_types.js',
  queries: 'js',
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
      -H, --header   [default: 'Cookie: server=MASTER'] Additional headers to send to server for introspectionQuery
                     (Hint: You probably want 'Cookie: server=<YOUR_VM_NAME>')
      -G, --glob     [default: ./] Glob pattern for directory matching. Provide a unique pattern to your sub-directory to generate types for.
      -O, --output   [default: 'generated_types.js'] Filename to write types to.
      -Q, --queries  [default: 'js'] Filetype extension to find GraphQL queries in (gql tags).
      -T, --target   [default: flow] (swift | typescript | flow | scala)
      -S, --schema   (optional) Use the given schema instead of using the result of an introspection query
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
      glob: {
        type: 'string',
        alias: 'G'
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
