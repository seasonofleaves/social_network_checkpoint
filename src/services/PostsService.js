import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Posts.js"
import { AppState } from "@/AppState.js"

class PostsService {
  clearSearchQuery() {
    AppState.postQuery = ''
  }

  clearPosts() {
    AppState.posts = []
    AppState.currentPage = 0
    AppState.totalPages = 0
  }

  async changeProfilePage(pageNumber, creatorId) {
    const response = await api.get(`api/posts?page=${pageNumber}&creatorId=${creatorId}`)
    logger.log('Changed profile page - posts service', response.data)
    this.handleResponseData(response.data)
  }

  async changeSearchPage(pageNumber, postQuery) {
    const response = await api.get(`api/posts?page=${pageNumber}&query=${postQuery}`)
    logger.log('Changed search page - posts service', response.data)
    this.handleResponseData(response.data)
  }

  async searchPosts(postQuery) {
    const response = await api.get(`api/posts?query=${postQuery}`)
    logger.log('Searched posts', response.data)
    AppState.postQuery = postQuery
    this.handleResponseData(response.data)
  }

  async changePostsPage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('Changed posts page', response.data)
    this.handleResponseData(response.data)
  }

  handleResponseData(responseData) {
    const newPosts = responseData.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
    AppState.currentPage = responseData.page
    AppState.totalPages = responseData.totalPages
  }

  async likePost(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    logger.log('Liking post', response.data)
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
    this.handleResponseData(response.data)
  }

  async getPostsByCreatorId(creatorId) {
    const response = await api.get(`api/posts?creatorId=${creatorId}`)
    logger.log('Got posts for profile - posts service', response.data)
    this.handleResponseData(response.data)
  }
}

export const postsService = new PostsService