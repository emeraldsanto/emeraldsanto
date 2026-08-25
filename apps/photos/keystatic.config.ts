import { collection, config, fields } from '@keystatic/core';

const categories = ['concerts', 'events', 'sports'] as const;

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
    publications: collection({
      label: 'Publications',
      slugField: 'outlet',
      path: 'src/content/publications/*',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        outlet: fields.slug({ name: { label: 'Outlet' } }),
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        url: fields.url({ label: 'URL', validation: { isRequired: true } }),
        publishedAt: fields.text({
          label: 'Published at (YYYY or YYYY-MM-DD)',
          validation: { isRequired: true },
        }),
        language: fields.select({
          label: 'Language',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Français', value: 'fr' },
            { label: 'Italiano', value: 'it' },
          ],
          defaultValue: 'en',
        }),
        kind: fields.select({
          label: 'Kind',
          options: [
            { label: 'Article', value: 'article' },
            { label: 'Listing', value: 'listing' },
          ],
          defaultValue: 'article',
        }),
        note: fields.text({ label: 'Note (e.g. "Top photo")' }),
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
            date: fields.date({
              label: 'Date',
              validation: { isRequired: true },
            }),
            location: fields.text({ label: 'Location (optional)' }),
          },
        }),
      ]),
    ),
  },
});
