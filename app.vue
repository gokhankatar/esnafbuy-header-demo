<template>
  <v-app :theme="_store.theme">
    <v-main>
      <v-container class="pa-3 pa-sm-6 pa-md-9 pa-lg-12 pa-xl-15">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import store from "./store/store";

const _store = store();

useSeoMeta({
  title: "esnafbuy | Biggest wholesale marketplace in Turkey",
  ogTitle: "Biggest wholesale marketplace in Turkey",
  description:
    "The best solution for your business operations.Biggest wholesale marketplace in Turkey",
  ogDescription:
    "The best solution for your business operations.Biggest wholesale marketplace in Turkey",
});
</script>
