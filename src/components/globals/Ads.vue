<script setup>
import { Ad } from '@/models/Ads.js';
import { adsService } from '@/services/AdsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';

 const props = defineProps({
  adProp: {type: Ad, required: true}
})
</script>

<template>
<div :title="adProp.title">
  <a :href="adProp.linkURL">
    <img class="img-fluid" :src="adProp.banner" :alt="`${adProp.title}`">
  </a>
</div>
</template>


<style lang="scss" scoped>

</style>