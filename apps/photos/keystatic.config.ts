import { collection, config, fields } from '@keystatic/core';

const categories = [
  'concerts',
  'events',
  'portraits',
  'weddings',
  'sports',
] as const;

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        name: fields.slug({ name: { label: 'Display name' } }),
        order: fields.integer({ label: 'Nav order', defaultValue: 1 }),
      },
    }),
    ...Object.fromEntries(
      categories.map((slug) => [
        `images_${slug}`,
        collection({
          label: `Images — ${slug}`,
          slugField: 'name',
          path: `src/content/images/${slug}/*`,
          format: { data: 'json' },
          entryLayout: 'form',
          schema: {
            name: fields.slug({ name: { label: 'Name' } }),
            image: fields.image({
              label: 'Image',
              directory: `src/assets/categories/${slug}/`,
              publicPath: `/src/assets/categories/${slug}/`,
            }),
            featured: fields.checkbox({
              label: 'Featured on home',
              defaultValue: false,
            }),
            caption: fields.text({
              label: 'Caption (optional)',
              multiline: true,
            }),
            date: fields.date({ label: 'Date', validation: { required: true } }),
            location: fields.text({ label: 'Location (optional)' }),
          },
        }),
      ]),
    ),
  },
});
