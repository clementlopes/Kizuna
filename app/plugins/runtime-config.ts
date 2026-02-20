export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  config.public.pocketbaseUrl = process.env.POCKETBASE_URL || 'https://anna.clementlopes.site';
  config.public.anilistClientId = process.env.ANILIST_CLIENT_ID || '';
  config.public.anilistRedirectUri = process.env.ANILIST_REDIRECT_URI || '';
  config.anilistClientSecret = process.env.ANILIST_CLIENT_SECRET || '';
});
