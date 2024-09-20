import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Posts.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('Creating post - posts service', response.data)
    const newPost = new Post(response.data)
    AppState.posts.push(newPost)
  }

  async getAllPosts() {
    const response = await api.get('api/posts')
    // logger.log('Got all posts - posts service', response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
  }

  async getPostsByCreatorId(creatorId) {
    const response = await api.get(`api/posts?creatorId=${creatorId}`)
    // logger.log('Got posts for profile - posts service', response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
  }
}

export const postsService = new PostsService