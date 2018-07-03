#!/usr/bin/env node
module.exports = function(rcConfig, flags) {
  const finalConfig = {...rcConfig, ...flags};

  console.warn(finalConfig);
};
