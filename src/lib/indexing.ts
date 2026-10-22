export const isPreview = import.meta.env.DEV || process.env.SITE_PREVIEW === '1' ||
  (process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH !== 'main');
