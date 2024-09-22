<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Posts.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({
  postProp: { type: Post, required: true}
})

const account = computed(() => AppState.account)

async function deletePost() {
  try {
    const wantsToDelete = await Pop.confirm(`Are you sure you want to delete this post?`)
    if(!wantsToDelete){return}
    await postsService.deletePost(props.postProp.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

</script>


<template>
  <div class="card">
    <router-link :to="{name: 'ProfileDetails', params: {profileId: postProp.creatorId}}" :title="`Go to ${postProp.creator.name}'s profile page!'`">
      <img :src="postProp.creator.picture" class="creator-img" :alt="`${postProp.creator.name}'s profile picture'`">
    </router-link>
    
    <div class="card-body">
      <h5 class="card-title">{{ postProp.creator.name }}</h5>
      <p>{{ postProp.createdAt.toLocaleString() }}</p>
      <p class="card-text">{{ postProp.body }}</p>
      <img v-if="postProp.imgUrl" class="img-fluid" :src="postProp.imgUrl" :alt="`${postProp.creator.name} posted a bad photo link`">
      <button v-if="postProp.creatorId == account?.id" @click="deletePost()" class="btn btn-danger">Delete</button>
    </div>
    <button class="btn"><i class="mdi mdi-heart-outline">{{ postProp.likeIds.length }}</i></button>
  </div>
</template>


<style lang="scss" scoped>
.creator-img{
  margin-top: 20px;
  margin-left: 20px;
  height: 15dvh;
  max-width: 15dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

img {
  object-fit: cover;
  object-position: center;
}
</style>