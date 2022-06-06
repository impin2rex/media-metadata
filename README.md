# Video's MetaData Reader [media-metadata]

This package is built on top of [MediaInfo](https://mediaarea.net/en/MediaInfo).
You can view any public video's metadata from the URL, or simply by inputting the file path.


## Installation

Install my-project with npm

```bash
  npm install media-metadata
```
    
## Usage/Examples

```javascript
const { fetchMediaInfoFromUrl, fetchMediaInfoFromFile} = require("media-metadata");

(async () => {
  const metadataFromUrl = 
    await fetchMediaInfoFromUrl('https://media.istockphoto.com/videos/female-streamer-playing-games-on-her-computer-video-id1296587040');
  console.log('metadataFromUrl', metadataFromUrl);

  const metadataFromFile = await fetchMediaInfoFromFile('/Users/rex/Downloads/video.mp4');
  console.log('metadataFromFile', metadataFromFile);
})();
```


## Roadmap

- Additional demo page at web

- CLI for operations


## 🚀 About Me
I'm a full stack developer...