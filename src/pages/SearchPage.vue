<script setup>
import { AppState } from '@/AppState.js';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import PostCard from '@/components/globals/PostCard.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onUnmounted, ref } from 'vue';

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)
const editableQuery = ref ('')

onUnmounted(() => {
  postsService.clearSearchQuery()
})

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
      <div class="col-12">
        <PageNavigation/>
      </div>
    </section>
    <section class="row">
      <div v-for="ad in ads" :key="ad.id" class="col-md-12">
        <Ads :adProp="ad"/>
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