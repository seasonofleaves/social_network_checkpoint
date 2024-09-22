import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Posts.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async changePostsPage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('Changed movie page', response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('Deleting post', response.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1)
  }

  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('Creating post - posts service', response.data)
    const newPost = new Post(response.data)
    AppState.posts.unshift(newPost)
  }

  async getAllPosts() {
    const response = await api.get('api/posts')
    logger.log('Got all posts - posts service', response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async getPostsByCreatorId(creatorId) {
    const response = await api.get(`api/posts?creatorId=${creatorId}`)
    // logger.log('Got posts for profile - posts service', response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
  }
}

export const postsService = new PostsService