<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)

onMounted (() => {
  getAllPosts()
})

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
      <div class="col-12">
        <h1>Posts</h1>
      </div>
    </section>
    <section class="row">
      <div class="col-md-12">
        <PostForm/>
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
