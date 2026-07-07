import type { ImageMetadata } from 'astro';

export function categoryFromId(id: string) {
  return id.split('/')[0];
}

export function slugFromId(id: string) {
  return id.split('/').pop() ?? id;
}

export function toGridImage(entry: {
  id: string;
  data: {
    image: ImageMetadata;
    caption?: string;
  };
}) {
  return {
    caption: entry.data.caption,
    category: categoryFromId(entry.id),
    image: entry.data.image,
    slug: slugFromId(entry.id),
  };
}
