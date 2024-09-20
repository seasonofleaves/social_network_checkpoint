<script setup>
import { Post } from '@/models/Posts.js';


defineProps({
  postProp: { type: Post, required: true}
})

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
      <button class="btn btn-primary">Delete if mine</button>
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