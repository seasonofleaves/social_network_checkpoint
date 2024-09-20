<script setup>
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';


const editablePostData = ref({
  body: '',
  imgUrl: '',
})

async function createPost(){
  try {
    const postData = editablePostData.value
    await postsService.createPost(postData)
    editablePostData.value = {
      body: '',
      imgUrl: '',
    }
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

</script>


<template>
    <form @submit.prevent="createPost()">
      <div class="mb-3">
        <label for="body" class="form-label">Example textarea</label>
        <textarea v-model="editablePostData.body" class="form-control" name="body" id="body" rows="3" maxlength="1000"></textarea>
      </div>
      <div class="mb-3">
        <label for="postImgUrl" class="form-label">Image Url</label>
        <input v-model="editablePostData.imgUrl" type="url" class="form-control" name="postImgUrl" id="postImgUrl" maxlength="500">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Post</button>
      </div>
    </form>
</template>


<style lang="scss" scoped>

</style>