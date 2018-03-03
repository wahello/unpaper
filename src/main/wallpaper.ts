import { screen } from 'electron';
import * as wallpaper from 'wallpaper';
import request from 'request';
import requestPromise from 'request-promise-native';
import * as fs from 'fs';
import * as path from 'path';

export default async () => {
  try {
    const unsplashResponse = await getRandomImage();
    const imagePath = await downloadImage(unsplashResponse.urls.full, unsplashResponse.id);
    await setWallpaper(imagePath);
  } catch (error) {
    console.log(error);
  }
};

const downloadImage = (url, name) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, `${name}.jpg`);
    const writableStream = fs.createWriteStream(filePath);
    request(url)
      .pipe(writableStream)
      .once('error', reject);

    writableStream.on('close', () => {
      resolve(filePath);
    });
    writableStream.on('error', reject);
  });
};

const getScreenSize = () => {
  const { height, width } = screen.getPrimaryDisplay().size;
  if (width > height) {
    return `orientation=landscape&w=${width}`;
  } else if (width === height) {
    return `orientation=squarish&w=${width}`;
  }
  return `orientation=portrait&h=${height}`;
};

const getRandomImage = async () => {
  return requestPromise({
    url: `https://api.unsplash.com/photos/random?${getScreenSize()}&fm=jpg`,
    headers: {
      Authorization: 'Client-ID cf2490a94f8eee61bc9fdce89fe09521a0ec14ef593924d780c3c77b79af08df',
    },
    json: true,
  });
};

const setWallpaper = async path => {
  return wallpaper.set(path, {
    scale: 'fill',
  });
};
