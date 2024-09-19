<template>
  <!-- loading bar -->
  <v-progress-circular
    class="loading-bar"
    :size="90"
    :width="9"
    :color="_store.theme === 'dark' ? '#4ABCE6' : '#1A2537'"
    indeterminate
  ></v-progress-circular>
</template>
<script lang="ts" setup>
import store from "~/store/store";

const _store = store();
</script>
<style scoped>
.loading-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
