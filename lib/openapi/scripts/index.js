#!/usr/bin/env node
const { writeFile } = require("fs/promises");
const { execSync } = require("node:child_process");

const pkg = require("../../../package.json");

const files = pkg.openapiFiles || [];

const launch = async (files) => {
  await Promise.all(
    files.map(async ({ input, output, swagger }) => {
      console.info("🚀 Fetching OpenAPI from", input);
      const response = await fetch(input);
      const json = await response.json();
      console.info("📦 Writing OpenAPI to", swagger);
      await writeFile(swagger, JSON.stringify(json, null, 2), "utf8");
      console.info("🔨 Generating TypeScript client to", output);
      execSync(`openapi-typescript ${swagger} -o ${output}`);
    })
  );
};
launch(files);
