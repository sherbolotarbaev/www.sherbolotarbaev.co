import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';
import axios from 'axios';

export const getBase64 = async (path: string) => {
  try {
    const file = await fs.readFile(`public/images/${path}`);
    const { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    else if (error && typeof error === 'object' && 'message' in error)
      return (error as { message: string }).message;
    else if (typeof error === 'string') return error;
    else return 'Unexpected error';
  }
};

export const getBase64FromURL = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const { base64 } = await getPlaiceholder(Buffer.from(response.data));
    return base64;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    else if (error && typeof error === 'object' && 'message' in error)
      return (error as { message: string }).message;
    else if (typeof error === 'string') return error;
    else return 'Unexpected error';
  }
};
