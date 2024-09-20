<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import AccountForm from '@/components/globals/AccountForm.vue';

const account = computed(() => AppState.account)

</script>

<template>
  <div v-if="account">
      <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="p-5">
      <AccountForm/>
    </div>
  </div>
  <div v-else>
    <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
