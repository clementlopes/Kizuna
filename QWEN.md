# Kizuna Project Documentation

## Project Overview

Kizuna is a Nuxt.js 4 application built with Vue 3, Tailwind CSS, and DaisyUI. The project is an anime tracking application that integrates with AniList for anime and manga data, and PocketBase for user authentication and local data storage. It follows modern web development practices with TypeScript, GraphQL, and Pinia for state management.

### Key Technologies
- **Framework**: Nuxt.js 4 (Vue 3)
- **Styling**: Tailwind CSS with DaisyUI components
- **State Management**: Pinia
- **Backend**: PocketBase integration
- **Data**: AniList API integration via GraphQL
- **Type System**: TypeScript
- **OAuth**: AniList OAuth2 integration

### Architecture
The project follows a typical Nuxt.js structure:
- `app/` - Main application files
  - `app.vue` - Root application component
  - `components/` - Reusable Vue components (headers, footers, alerts, toasts, etc.)
  - `composables/` - Vue composables including authentication stores
  - `pages/` - Route-based pages (index, profile, auth)
  - `server/` - Server-side API endpoints
  - `plugins/` - Nuxt plugins
  - `assets/` - Static assets and styles
- `shared/` - Shared types and utilities
  - `types/` - TypeScript interfaces (UserType, AlertType, etc.)

## Building and Running

### Prerequisites
- Node.js (version compatible with Nuxt 4)
- npm or yarn

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   - `ANILIST_CLIENT_ID` - AniList application client ID
   - `ANILIST_CLIENT_SECRET` - AniList application client secret (server-side only)
   - `ANILIST_REDIRECT_URI` - AniList redirect URI for OAuth callback
   - `POCKETBASE_URL` - Custom PocketBase URL (defaults to 'http://anna.clementlopes.site')

### Development Commands
- **Development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Generate static site**: `npm run generate`
- **Preview production build**: `npm run preview`
- **Post-install preparation**: `npm run postinstall` (runs automatically after install)

### Project Structure
```
├── nuxt.config.ts          # Nuxt.js configuration with AniList/PocketBase settings
├── package.json            # Dependencies and scripts
├── app/
│   ├── app.vue             # Root application component
│   ├── user.store.ts       # User state management
│   ├── components/         # Reusable Vue components
│   ├── composables/        # Vue composables (including useMyAuthStore)
│   ├── pages/              # Route-based pages
│   ├── server/             # Server-side API endpoints (including AniList token exchange)
│   ├── plugins/            # Nuxt plugins (including auth.client)
│   └── assets/             # Styles, images, etc.
├── shared/
│   └── types/              # Shared TypeScript definitions
└── ...
```

## Development Conventions

### Component Structure
Components are organized in the `app/components/` directory with subdirectories for related components (e.g., alerts, drawers, toast).

### State Management
Pinia is used for state management, integrated as a module in the Nuxt configuration.

### Styling
- Tailwind CSS for utility-first styling
- DaisyUI for component classes and themes
- Theme switching capabilities using the theme-change package

### Type Safety
TypeScript interfaces are defined in the `shared/types/` directory to ensure type safety across the application.

### API Integration
- Server-side API routes in `app/server/api/`
- Integration with external services (PocketBase, AniList)
- GraphQL for data management

## AniList Authentication Flow

The application implements a complete OAuth2 flow with AniList:

1. **Authorization Request**: User clicks "Link AniList Account" which redirects to AniList authorization
2. **Token Exchange**: After user authorizes, AniList redirects back with a code
3. **Server-Side Exchange**: A client-side plugin detects the code and calls a server API to exchange it for an access token
4. **Profile Sync**: The application fetches the user's AniList profile and syncs it with the PocketBase user
5. **Storage**: AniList credentials are stored in the PocketBase user record

### Key Components
- `app/composables/useMyAuthStore.ts` - Orchestrates the AniList authentication flow
- `app/server/api/anilist/token.post.ts` - Securely exchanges authorization code for access token
- `app/plugins/auth.client.ts` - Handles OAuth callback processing on the client
- `app/pages/index.vue` - Entry point with AniList linking UI
- `shared/types/UserType.ts` - Extended with AniList-specific fields

### Security Considerations
- AniList client secret is kept server-side only
- Access tokens are stored securely in PocketBase user records
- No direct exposure of sensitive credentials to the client

## Key Features

1. **AniList Integration**: Complete OAuth2 flow for connecting AniList accounts
2. **Authentication System**: With auth pages and user management
3. **Theme Support**: Dark/light mode with theme-change package
4. **Notification System**: Toast and alert components
5. **Responsive Design**: Using Tailwind CSS and DaisyUI
6. **External API Integration**: PocketBase and AniList integrations
7. **GraphQL Usage**: For interacting with AniList API

## Environment Configuration

The application uses runtime configuration for both public and private environment variables:
```typescript
runtimeConfig: {
  // Private env variables (server-side only)
  anilistClientSecret: process.env.ANILIST_CLIENT_SECRET,

  // Public env variables (exposed to client)
  public: {
    pocketbaseUrl: process.env.POCKETBASE_URL || 'http://anna.clementlopes.site',
    anilistClientId: process.env.ANILIST_CLIENT_ID,
    anilistRedirectUri: process.env.ANILIST_REDIRECT_URI,
  },
}
```

## Special Notes

- The application requires a linked AniList account to function properly
- AniList serves as the single source of truth for anime lists and user profiles
- All anime-related data comes from the AniList API
- The auth plugin handles OAuth callback processing automatically
- The application follows strict security practices with OAuth2 implementation