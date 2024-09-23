<script setup>
import { AppState } from '@/AppState.js';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { postsService } from '@/services/PostsService.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)

watch (() => route.params.profileId, () => {
  getProfileById()
  getPostsByCreatorId()
}, {immediate: true})

async function getProfileById(){
  try {
    const profileId = route.params.profileId
    logger.log('Id of the profile from the URL', profileId)
    await profilesService.getProfileById(profileId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

async function getPostsByCreatorId() {
  try {
    const profileId = route.params.profileId
    await postsService.getPostsByCreatorId(profileId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

</script>


<template>
  <div v-if="profile" class="container">
    <section class="row cover-img-bg align-items-center" :style="{backgroundImage:`url(${profile.coverImg})`}">
      <div class="col-12">
        <div class="text-light d-flex justify-content-center align-items-center gap-2">
          <h1>
            <span class="me-2">{{ profile.name }}</span>
            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="text-light" title="Connect with me on LinkedIn!">
              <i class="mdi mdi-linkedin"></i>
            </a>
            <a v-if="profile.github" :href="profile.github" target="_blank" class="text-light" title="Connect with me on GitHub!">
              <i class="mdi mdi-github"></i>
            </a>
          </h1>
          <h2>{{ profile.class }}</h2>
          <div class="position-relative">
            <img :src="profile.picture" :alt="profile.name" class="profile-img">
            <i v-if="profile.graduated" class="mdi mdi-account-school fs-1 grad-icon"></i>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="row">
      <div class="col-12">
        <PageNavigation/>
      </div>
    </section> -->
    <section class="row">
      <div class="col-12">
        <p>{{ profile.bio }}</p>
      </div>
    </section>
    <section class="row">
      <div v-if="profile.id == account?.id" class="col-md-12">
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


<style lang="scss" scoped>
.cover-img-bg{
  height: 30dvh;
  background-size: cover;
  background-position: center;
}

.profile-img{
  height: 30dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin: 40px;
}

.grad-icon{
  position: absolute;
  right: 40px;
  padding-left: 10px;
  padding-right: 10px;
  bottom: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: white;
  color: rgb(86, 86, 86);
  border-style: solid;
  border-color: black;
  border-width: 2px;
}

</style>