<script setup>
import { AppState } from '@/AppState.js';
import Ads from '@/components/globals/Ads.vue';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { Ad } from '@/models/Ads.js';
import { adsService } from '@/services/AdsService.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted } from 'vue';

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)
const ads = computed(() => AppState.ads)

onMounted (() => {
  getAllPosts()
  getAds()
})

onUnmounted(() => {
  postsService.clearPosts()
})

async function getAds() {
  try {
    await adsService.getAds()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

async function getAllPosts() {
  try {
    await postsService.getAllPosts()

  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

</script>

<template>
  <div class="container">
    <section class="row">
      <div class="col-6">
        <h1>Posts</h1>
      </div>
      <div class="col-6">
        <PageNavigation />
      </div>
    </section>
    <section class="row">
      <div v-if="account" class="col-md-12">
        <PostForm/>
      </div>
    </section>
    <section class="row">
      <div v-for="ad in ads" :key="ad.id" class="col-md-12">
        <Ads :adProp="ad"/>
      </div>
    </section>
    <section class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-12 mb-3">
        <PostCard :postProp="post"/>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
