import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getAllPosts() {
    const response = await api.get('api/posts')
    logger.log('Got all posts - posts service', response.data)
  }
}

export const postsService = new PostsService