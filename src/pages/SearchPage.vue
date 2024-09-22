<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/globals/PostCard.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const posts = computed(() => AppState.posts)
const editableQuery = ref ('')

async function searchPosts(){
  try {
    await postsService.searchPosts(editableQuery.value)
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
        <h1>Search Posts</h1>
      </div>
      <div class="col-12">
        <form @submit.prevent="searchPosts()">
          <div>
            <label for="" class="form-control-label"></label>
            <div class="d-flex">
              <input v-model="editableQuery" type="text" class="form-control flex-grow-1" name="query" id="query"
                placeholder="Keyword..." required>
              <button class="btn btn-outline-dark" type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class="row">
      <div v-for="post in posts" :key="post.id" class="col-12">
        <PostCard :postProp="post" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>