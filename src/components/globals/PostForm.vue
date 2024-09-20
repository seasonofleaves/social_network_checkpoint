<script setup>
import { ref } from 'vue';


const editablePostData = ref({
  body: '',
  imgUrl: '',
})

</script>


<template>
  <h1>Post Form</h1>
    <form >
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