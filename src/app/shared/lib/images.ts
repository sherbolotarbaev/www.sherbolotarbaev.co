import { getBase64 } from './blur-data-url';

export type TImage = {
  src: string;
  alt: string;
  blurDataURL: string;
};

const images = [
  'urban-construction.jpeg',
  'evening-crossroads.jpeg',
  'horse.jpeg',
  'jailoo-2.jpeg',
  'jailoo-3.jpeg',
  'jailoo.jpeg',
  'mountain-reflections.jpeg',
  'rainy-street.jpeg',
  'sunset.jpeg',
  'ak-suu.jpeg',
];

export async function getImagesWithBlur(): Promise<TImage[]> {
  const base64Promises = images.map((image) => getBase64(image));
  const blurDataURLs = await Promise.all(base64Promises);

  const imagesWithBlur = images.map((image, index) => ({
    src: `/images/${image}`,
    alt: `Image ${index + 1}`,
    blurDataURL: blurDataURLs[index],
  }));

  return imagesWithBlur;
}
