import { BLOB_READ_WRITE_TOKEN } from 'astro:env/server';
import { list } from '@vercel/blob';

export async function listBlobs(prefix: string) {
  const { blobs } = await list({ prefix, token: BLOB_READ_WRITE_TOKEN });
  return blobs.filter((blob) => blob.pathname !== prefix);
}

export async function listFolders(prefix: string) {
  const { folders } = await list({
    mode: 'folded',
    prefix,
    token: BLOB_READ_WRITE_TOKEN,
  });
  return folders;
}
