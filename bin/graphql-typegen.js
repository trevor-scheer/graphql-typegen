#!/usr/bin/env node
const childProcess = require('child_process');
const glob = require('glob');

module.exports = function(rcConfig, cliFlags) {
  const finalConfig = {...rcConfig, ...cliFlags};

  const [rootDir] = finalConfig.glob ? glob.sync(finalConfig.glob) : ['./'];
  if (!rootDir) {
    console.error(`
      !-------------------------------------!
      ! Unable to locate a unique directory !
      !     with provided glob pattern      !
      !-------------------------------------!
    `);
    return;
  }

  const schema = finalConfig.schema || `./${rootDir}generatedSchema.json`;
  // Fetch schema if not provided
  if (finalConfig.schema == null) {
    childProcess.spawnSync('apollo', [
      'schema:download',
      schema,
      `--endpoint=${finalConfig.endpoint}`,
      `--header=${finalConfig.header}`
    ]);
  }

  // Generate data types file
  childProcess.spawnSync(
    'apollo',
    [
      'codegen:generate',
      `./${rootDir}${finalConfig.output}`,
      `--schema=${schema}`,
      `--queries=./${rootDir}**/*.${finalConfig.queries}`,
      `--target=${finalConfig.target}`,
      '--useFlowReadOnlyTypes'
    ],
    {env: process.env, stdio: 'inherit'}
  );

  // Clean up
  if (finalConfig.schema == null) {
    childProcess.spawnSync('rm', [schema]);
  }
};
