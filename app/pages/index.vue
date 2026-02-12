<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Welcome to Kizuna</h1>
    
    <!-- Check if user is authenticated with PocketBase -->
    <div v-if="!pocketbaseStore.pb.authStore.model">
      <p>Please log in</p>
    </div>
    <div v-else>
      <!-- Check if user has AniList token -->
      <div v-if="!pocketbaseStore.pb.authStore.model.anilist_token || 
                 !pocketbaseStore.pb.authStore.model.anilist_token.trim()">
        <button @click="loginWithAniList" class="btn btn-info">
          Link AniList Account
        </button>
      </div>
      <div v-else>
        <p>AniList account linked</p>
      </div>
    </div>
    
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { usePocketbaseStore } from '~/composables/usePocketbaseStore';
import { useAnilistAuthStore } from '~/composables/useAnilistAuthStore';

const pocketbaseStore = usePocketbaseStore();
const anilistAuthStore = useAnilistAuthStore();

const loginWithAniList = () => {
  anilistAuthStore.loginWithAniList();
};

// Watch for changes in the auth store to reactively update the UI
watch(() => pocketbaseStore.pb.authStore.model?.anilist_token, () => {
  // The component will automatically re-render when the token changes
}, { immediate: true });
</script>