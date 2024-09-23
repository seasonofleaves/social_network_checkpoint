<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed (() => AppState.totalPages)

onMounted(()=>{
  logger.log('Current Page', route.name)
})

async function changePage(pageNumber){
  try {
    if (AppState.postQuery == ''){
      await postsService.changePostsPage(pageNumber)
    }
    // else if(route.name == ProfileDetails){

    // }
    else {
      await postsService.changeSearchPage(pageNumber, AppState.postQuery)
    }
  } catch (error) {
    Pop.error(error)
  }
}

</script>


<template>
  <div class="d-flex gap-3 align-items-center my-3">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage < 2" class="btn btn-outline-dark">Previous</button>
      <span class="fs-f"> Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages" class="btn btn-outline-dark">Next</button>
  </div>
</template>


<style lang="scss" scoped>

</style>