const path = require('node:path');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

let currentPath = path.relative(process.cwd(), __dirname);
if (!currentPath) currentPath = '.';

async function fetchMediaInfoFromUrl(url) {
  // ./cli/mediainfo ${url}
  const { stdout, stderr } = await exec(`${currentPath}/cli/mediainfo ${url}`, {
    cwd: process.cwd(),
  });
  if (stderr) {
    console.error('stderr:', stderr);
    return null;
  }
  return stdout;
}

async function fetchMediaInfoFromFile(filePath) {
  const { stdout, stderr } = await exec(
    `${currentPath}/cli/mediainfo ${filePath}`
  );
  if (stderr) {
    console.error('stderr:', stderr);
    return null;
  }
  return stdout;
}

module.exports = { fetchMediaInfoFromUrl, fetchMediaInfoFromFile };
