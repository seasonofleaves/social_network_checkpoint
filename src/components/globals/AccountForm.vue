<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted, ref } from 'vue';

const editableAccountData = ref({
  name:'',
  picture: '',
  bio: '',
  coverImg: '',
  github: '',
  linkedin: '',
  class: '',
  graduated: false
})

onMounted(() =>{
  editableAccountData.value = {...AppState.account}
})

async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Pop.success("Changes Saved!")
  }
  catch (error){
    Pop.error(error);
    logger.error(error)
  }
}

</script>


<template>
<form @submit.prevent="updateAccount()" class="row g-3">
  <div class="col-md-6">
    <label for="accountName" class="form-label">Account Name</label>
    <input v-model="editableAccountData.name" type="text" name="accountName" class="form-control" id="accountName" maxlength="100">
  </div>
  <div class="col-md-6">
    <label for="accountPicture" class="form-label">Profile Picture</label>
    <input v-model="editableAccountData.picture" type="url" name="accountPicture" class="form-control" id="accountPicture" maxlength="500">
  </div>
  <div class="col-12">
    <label for="accountBio" class="form-label">Biography</label>
    <input v-model="editableAccountData.bio" type="text" name="accountBio" class="form-control" id="accountBio" maxlength="1000">
  </div>
  <div class="col-6">
    <label for="accountCoverImg" class="form-label">Cover Image</label>
    <input v-model="editableAccountData.coverImg" type="url" name="accountCoverImg" class="form-control" id="accountCoverImg" maxlength="500">
  </div>
  <div class="col-6">
    <label for="class" class="form-label">Class</label>
    <input v-model="editableAccountData.class" type="text" name="class" class="form-control" id="class" maxlength="100">
  </div>
  <div class="col-md-6">
    <label for="accountGitHub" class="form-label">GitHub Link</label>
    <input v-model="editableAccountData.github" type="url" name="accountGitHub" class="form-control" id="accountGitHub" maxlength="500">
  </div>
  <div class="col-md-6">
    <label for="accountLinkedIn" class="form-label">LinkedIn Link</label>
    <input v-model="editableAccountData.linkedin" type="url" name="accountLinkedIn" class="form-control" id="accountLinkedIn" maxlength="500">
  </div>
  <div class="col-12">
    <div class="form-check">
      <input v-model="editableAccountData.graduated" class="form-check-input" type="checkbox" name="accountGraduated" id="accountGraduated">
      <label class="form-check-label" for="accountGraduated">
        Have you graduated?
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Save Changes</button>
  </div>
</form>
</template>


<style lang="scss" scoped>

</style>