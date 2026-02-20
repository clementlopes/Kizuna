// server/api/anilist/exchange-token.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { code, redirect_uri } = body;
  
  const anilistClientId = process.env.ANILIST_CLIENT_ID;
  const anilistClientSecret = process.env.ANILIST_CLIENT_SECRET;
  
  console.log('ANILIST_CLIENT_ID:', anilistClientId ? 'set' : 'not set');
  console.log('ANILIST_CLIENT_SECRET:', anilistClientSecret ? 'set' : 'not set');
  
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Authorization code is required'
    });
  }
  
  if (!anilistClientId || !anilistClientSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'AniList credentials not configured on server'
    });
  }
  
  try {
    const response = await $fetch<{ access_token: string; expires_in: number }>('https://anilist.co/api/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        grant_type: 'authorization_code',
        client_id: anilistClientId,
        client_secret: anilistClientSecret,
        code,
        redirect_uri,
      },
    });

    return {
      access_token: response.access_token,
      expires_in: response.expires_in,
    };
  } catch (error: any) {
    console.error('Error exchanging AniList code for token:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to exchange authorization code for access token'
    });
  }
});
