<script setup>
import { AppState } from '@/AppState.js';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)
// const currentPage = computed(() => AppState.currentPage)
// const totalPages = computed(() => AppState.totalPages)

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

// async function changePage(pageNumber){
//   try {
//     await postsService.changePostsPage(pageNumber)
//   } catch (error) {
//     Pop.error(error)
//   }
// }

</script>

<template>
  <div class="container">
    <section class="row">
      <div class="col-6">
        <h1>Posts</h1>
      </div>
      <div class="col-6">
        <!-- <div class="d-flex gap-3 align-items-center my-3">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage == 1" class="btn btn-outline-dark">Previous</button>
          <span class="fs-f"> Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages" class="btn btn-outline-dark">Next</button>
        </div> -->
        <PageNavigation />
      </div>
    </section>
    <section class="row">
      <div v-if="account" class="col-md-12">
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
