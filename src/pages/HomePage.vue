<script setup>
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';

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
  </div>
</template>

<style scoped lang="scss"></style>
