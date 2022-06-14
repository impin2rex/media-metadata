const os = require('node:os');
const path = require('node:path');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const platform = os.platform(); // Detects the current platform.
const arch = os.arch(); // cause based upon will run the specific binary
if (platform !== 'darwin' && platform !=='linux' && platform !== 'win32') {
  console.error('Unsupported platform.');
  process.exit(1);
}

if (platform === 'darwin' && arch !== 'arm64') {
  console.error('Unsupported architecture.');
  process.exit(1);
}

if (platform === 'win32' && arch !== 'x64') {
  console.error('Unsupported architecture.');
  process.exit(1);
}

if (platform === 'linux' && arch !== 'x64') {
  console.error('Unsupported architecture.');
  process.exit(1);
}

let currentPath = path.relative(process.cwd(), __dirname);
if (!currentPath) currentPath = '.';

const mediainfoPath = path.join('bin', platform, arch, platform === 'win32' ? 'MediaInfo.exe' : 'mediainfo');

async function fetchMediaInfoFromUrl(url) {
  const { stdout, stderr } = await exec(`${currentPath}/${mediainfoPath} ${url} --output=JSON`, {
    cwd: process.cwd(),
  });
  if (stderr) {
    console.error('stderr:', stderr);
    return null;
  }
  return JSON.parse(stdout);
}

async function fetchMediaInfoFromFile(filePath) {
  const { stdout, stderr } = await exec(
    `${currentPath}/${mediainfoPath} ${filePath} --output=JSON`,
  );
  if (stderr) {
    console.error('stderr:', stderr);
    return null;
  }
  return JSON.parse(stdout);
}

module.exports = { fetchMediaInfoFromUrl, fetchMediaInfoFromFile };
